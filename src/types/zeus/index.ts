/* eslint-disable */

import { AllTypesProps, ReturnTypes, Ops } from './const';
export const HOST = "http://localhost:8080/graphql"


export const HEADERS = {}
export const apiSubscription = (options: chainOptions) => (query: string) => {
  try {
    const queryString = options[0] + '?query=' + encodeURIComponent(query);
    const wsString = queryString.replace('http', 'ws');
    const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
    const webSocketOptions = options[1]?.websocket || [host];
    const ws = new WebSocket(...webSocketOptions);
    return {
      ws,
      on: (e: (args: any) => void) => {
        ws.onmessage = (event: any) => {
          if (event.data) {
            const parsed = JSON.parse(event.data);
            const data = parsed.data;
            return e(data);
          }
        };
      },
      off: (e: (args: any) => void) => {
        ws.onclose = e;
      },
      error: (e: (args: any) => void) => {
        ws.onerror = e;
      },
      open: (e: () => void) => {
        ws.onopen = e;
      },
    };
  } catch {
    throw new Error('No websockets implemented');
  }
};
const handleFetchResponse = (response: Response): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response
        .text()
        .then((text) => {
          try {
            reject(JSON.parse(text));
          } catch (err) {
            reject(text);
          }
        })
        .catch(reject);
    });
  }
  return response.json() as Promise<GraphQLResponse>;
};

export const apiFetch =
  (options: fetchOptions) =>
  (query: string, variables: Record<string, unknown> = {}) => {
    const fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      return fetch(`${options[0]}?query=${encodeURIComponent(query)}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetch(`${options[0]}`, {
      body: JSON.stringify({ query, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };

export const InternalsBuildQuery = ({
  ops,
  props,
  returns,
  options,
  scalars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  options?: OperationOptions;
  scalars?: ScalarDefinition;
}) => {
  const ibb = (
    k: string,
    o: InputValueType | VType,
    p = '',
    root = true,
    vars: Array<{ name: string; graphQLType: string }> = [],
  ): string => {
    const keyForPath = purifyGraphQLKey(k);
    const newPath = [p, keyForPath].join(SEPARATOR);
    if (!o) {
      return '';
    }
    if (typeof o === 'boolean' || typeof o === 'number') {
      return k;
    }
    if (typeof o === 'string') {
      return `${k} ${o}`;
    }
    if (Array.isArray(o)) {
      const args = InternalArgsBuilt({
        props,
        returns,
        ops,
        scalars,
        vars,
      })(o[0], newPath);
      return `${ibb(args ? `${k}(${args})` : k, o[1], p, false, vars)}`;
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(`${alias}:${operationName}`, operation, p, false, vars);
        })
        .join('\n');
    }
    const hasOperationName = root && options?.operationName ? ' ' + options.operationName : '';
    const keyForDirectives = o.__directives ?? '';
    const query = `{${Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map((e) => ibb(...e, [p, `field<>${keyForPath}`].join(SEPARATOR), false, vars))
      .join('\n')}}`;
    if (!root) {
      return `${k} ${keyForDirectives}${hasOperationName} ${query}`;
    }
    const varsString = vars.map((v) => `${v.name}: ${v.graphQLType}`).join(', ');
    return `${k} ${keyForDirectives}${hasOperationName}${varsString ? `(${varsString})` : ''} ${query}`;
  };
  return ibb;
};

export const Thunder =
  (fn: FetchFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: (Z & ValueTypes[R]) | ValueTypes[R],
    ops?: OperationOptions & { variables?: Record<string, unknown> },
  ) =>
    fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
      ops?.variables,
    ).then((data) => {
      if (graphqlOptions?.scalars) {
        return decodeScalarsInResponse({
          response: data,
          initialOp: operation,
          initialZeusQuery: o as VType,
          returns: ReturnTypes,
          scalars: graphqlOptions.scalars,
          ops: Ops,
        });
      }
      return data;
    }) as Promise<InputType<GraphQLTypes[R], Z, SCLR>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));

export const SubscriptionThunder =
  (fn: SubscriptionFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: (Z & ValueTypes[R]) | ValueTypes[R],
    ops?: OperationOptions & { variables?: ExtractVariables<Z> },
  ) => {
    const returnedFunction = fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
    ) as SubscriptionToGraphQL<Z, GraphQLTypes[R], SCLR>;
    if (returnedFunction?.on && graphqlOptions?.scalars) {
      const wrapped = returnedFunction.on;
      returnedFunction.on = (fnToCall: (args: InputType<GraphQLTypes[R], Z, SCLR>) => void) =>
        wrapped((data: InputType<GraphQLTypes[R], Z, SCLR>) => {
          if (graphqlOptions?.scalars) {
            return fnToCall(
              decodeScalarsInResponse({
                response: data,
                initialOp: operation,
                initialZeusQuery: o as VType,
                returns: ReturnTypes,
                scalars: graphqlOptions.scalars,
                ops: Ops,
              }),
            );
          }
          return fnToCall(data);
        });
    }
    return returnedFunction;
  };

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends keyof typeof Ops,
  R extends keyof ValueTypes = GenericOperation<O>,
>(
  operation: O,
  o: (Z & ValueTypes[R]) | ValueTypes[R],
  ops?: {
    operationOptions?: OperationOptions;
    scalars?: ScalarDefinition;
  },
) =>
  InternalsBuildQuery({
    props: AllTypesProps,
    returns: ReturnTypes,
    ops: Ops,
    options: ops?.operationOptions,
    scalars: ops?.scalars,
  })(operation, o as VType);

export const ZeusSelect = <T>() => ((t: unknown) => t) as SelectionFunction<T>;

export const Selector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();

export const TypeFromSelector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();
export const Gql = Chain(HOST, {
  headers: {
    'Content-Type': 'application/json',
    ...HEADERS,
  },
});

export const ZeusScalars = ZeusSelect<ScalarCoders>();

export const decodeScalarsInResponse = <O extends Operations>({
  response,
  scalars,
  returns,
  ops,
  initialZeusQuery,
  initialOp,
}: {
  ops: O;
  response: any;
  returns: ReturnTypesType;
  scalars?: Record<string, ScalarResolver | undefined>;
  initialOp: keyof O;
  initialZeusQuery: InputValueType | VType;
}) => {
  if (!scalars) {
    return response;
  }
  const builder = PrepareScalarPaths({
    ops,
    returns,
  });

  const scalarPaths = builder(initialOp as string, ops[initialOp], initialZeusQuery);
  if (scalarPaths) {
    const r = traverseResponse({ scalarPaths, resolvers: scalars })(initialOp as string, response, [ops[initialOp]]);
    return r;
  }
  return response;
};

export const traverseResponse = ({
  resolvers,
  scalarPaths,
}: {
  scalarPaths: { [x: string]: `scalar.${string}` };
  resolvers: {
    [x: string]: ScalarResolver | undefined;
  };
}) => {
  const ibb = (k: string, o: InputValueType | VType, p: string[] = []): unknown => {
    if (Array.isArray(o)) {
      return o.map((eachO) => ibb(k, eachO, p));
    }
    if (o == null) {
      return o;
    }
    const scalarPathString = p.join(SEPARATOR);
    const currentScalarString = scalarPaths[scalarPathString];
    if (currentScalarString) {
      const currentDecoder = resolvers[currentScalarString.split('.')[1]]?.decode;
      if (currentDecoder) {
        return currentDecoder(o);
      }
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string' || !o) {
      return o;
    }
    const entries = Object.entries(o).map(([k, v]) => [k, ibb(k, v, [...p, purifyGraphQLKey(k)])] as const);
    const objectFromEntries = entries.reduce<Record<string, unknown>>((a, [k, v]) => {
      a[k] = v;
      return a;
    }, {});
    return objectFromEntries;
  };
  return ibb;
};

export type AllTypesPropsType = {
  [x: string]:
    | undefined
    | `scalar.${string}`
    | 'enum'
    | {
        [x: string]:
          | undefined
          | string
          | {
              [x: string]: string | undefined;
            };
      };
};

export type ReturnTypesType = {
  [x: string]:
    | {
        [x: string]: string | undefined;
      }
    | `scalar.${string}`
    | undefined;
};
export type InputValueType = {
  [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType =
  | undefined
  | boolean
  | string
  | number
  | [any, undefined | boolean | InputValueType]
  | InputValueType;

export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType =
  | PlainType
  | {
      [x: string]: ZeusArgsType;
    }
  | Array<ZeusArgsType>;

export type Operations = Record<string, string>;

export type VariableDefinition = {
  [x: string]: unknown;
};

export const SEPARATOR = '|';

export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & { websocket?: websocketOptions }] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type OperationOptions = {
  operationName?: string;
};

export type ScalarCoder = Record<string, (s: unknown) => string>;

export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
export class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('');
    console.error(response);
  }
  toString() {
    return 'GraphQL Response Error';
  }
}
export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
  scalars?: SCLR | ScalarCoders;
};

const ExtractScalar = (mappedParts: string[], returns: ReturnTypesType): `scalar.${string}` | undefined => {
  if (mappedParts.length === 0) {
    return;
  }
  const oKey = mappedParts[0];
  const returnP1 = returns[oKey];
  if (typeof returnP1 === 'object') {
    const returnP2 = returnP1[mappedParts[1]];
    if (returnP2) {
      return ExtractScalar([returnP2, ...mappedParts.slice(2)], returns);
    }
    return undefined;
  }
  return returnP1 as `scalar.${string}` | undefined;
};

export const PrepareScalarPaths = ({ ops, returns }: { returns: ReturnTypesType; ops: Operations }) => {
  const ibb = (
    k: string,
    originalKey: string,
    o: InputValueType | VType,
    p: string[] = [],
    pOriginals: string[] = [],
    root = true,
  ): { [x: string]: `scalar.${string}` } | undefined => {
    if (!o) {
      return;
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
      const extractionArray = [...pOriginals, originalKey];
      const isScalar = ExtractScalar(extractionArray, returns);
      if (isScalar?.startsWith('scalar')) {
        const partOfTree = {
          [[...p, k].join(SEPARATOR)]: isScalar,
        };
        return partOfTree;
      }
      return {};
    }
    if (Array.isArray(o)) {
      return ibb(k, k, o[1], p, pOriginals, false);
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(alias, operationName, operation, p, pOriginals, false);
        })
        .reduce((a, b) => ({
          ...a,
          ...b,
        }));
    }
    const keyName = root ? ops[k] : k;
    return Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map(([k, v]) => {
        // Inline fragments shouldn't be added to the path as they aren't a field
        const isInlineFragment = originalKey.match(/^...\s*on/) != null;
        return ibb(
          k,
          k,
          v,
          isInlineFragment ? p : [...p, purifyGraphQLKey(keyName || k)],
          isInlineFragment ? pOriginals : [...pOriginals, purifyGraphQLKey(originalKey)],
          false,
        );
      })
      .reduce((a, b) => ({
        ...a,
        ...b,
      }));
  };
  return ibb;
};

export const purifyGraphQLKey = (k: string) => k.replace(/\([^)]*\)/g, '').replace(/^[^:]*\:/g, '');

const mapPart = (p: string) => {
  const [isArg, isField] = p.split('<>');
  if (isField) {
    return {
      v: isField,
      __type: 'field',
    } as const;
  }
  return {
    v: isArg,
    __type: 'arg',
  } as const;
};

type Part = ReturnType<typeof mapPart>;

export const ResolveFromPath = (props: AllTypesPropsType, returns: ReturnTypesType, ops: Operations) => {
  const ResolvePropsType = (mappedParts: Part[]) => {
    const oKey = ops[mappedParts[0].v];
    const propsP1 = oKey ? props[oKey] : props[mappedParts[0].v];
    if (propsP1 === 'enum' && mappedParts.length === 1) {
      return 'enum';
    }
    if (typeof propsP1 === 'string' && propsP1.startsWith('scalar.') && mappedParts.length === 1) {
      return propsP1;
    }
    if (typeof propsP1 === 'object') {
      if (mappedParts.length < 2) {
        return 'not';
      }
      const propsP2 = propsP1[mappedParts[1].v];
      if (typeof propsP2 === 'string') {
        return rpp(
          `${propsP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
      if (typeof propsP2 === 'object') {
        if (mappedParts.length < 3) {
          return 'not';
        }
        const propsP3 = propsP2[mappedParts[2].v];
        if (propsP3 && mappedParts[2].__type === 'arg') {
          return rpp(
            `${propsP3}${SEPARATOR}${mappedParts
              .slice(3)
              .map((mp) => mp.v)
              .join(SEPARATOR)}`,
          );
        }
      }
    }
  };
  const ResolveReturnType = (mappedParts: Part[]) => {
    if (mappedParts.length === 0) {
      return 'not';
    }
    const oKey = ops[mappedParts[0].v];
    const returnP1 = oKey ? returns[oKey] : returns[mappedParts[0].v];
    if (typeof returnP1 === 'object') {
      if (mappedParts.length < 2) return 'not';
      const returnP2 = returnP1[mappedParts[1].v];
      if (returnP2) {
        return rpp(
          `${returnP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
    }
  };
  const rpp = (path: string): 'enum' | 'not' | `scalar.${string}` => {
    const parts = path.split(SEPARATOR).filter((l) => l.length > 0);
    const mappedParts = parts.map(mapPart);
    const propsP1 = ResolvePropsType(mappedParts);
    if (propsP1) {
      return propsP1;
    }
    const returnP1 = ResolveReturnType(mappedParts);
    if (returnP1) {
      return returnP1;
    }
    return 'not';
  };
  return rpp;
};

export const InternalArgsBuilt = ({
  props,
  ops,
  returns,
  scalars,
  vars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  scalars?: ScalarDefinition;
  vars: Array<{ name: string; graphQLType: string }>;
}) => {
  const arb = (a: ZeusArgsType, p = '', root = true): string => {
    if (typeof a === 'string') {
      if (a.startsWith(START_VAR_NAME)) {
        const [varName, graphQLType] = a.replace(START_VAR_NAME, '$').split(GRAPHQL_TYPE_SEPARATOR);
        const v = vars.find((v) => v.name === varName);
        if (!v) {
          vars.push({
            name: varName,
            graphQLType,
          });
        } else {
          if (v.graphQLType !== graphQLType) {
            throw new Error(
              `Invalid variable exists with two different GraphQL Types, "${v.graphQLType}" and ${graphQLType}`,
            );
          }
        }
        return varName;
      }
    }
    const checkType = ResolveFromPath(props, returns, ops)(p);
    if (checkType.startsWith('scalar.')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...splittedScalar] = checkType.split('.');
      const scalarKey = splittedScalar.join('.');
      return (scalars?.[scalarKey]?.encode?.(a) as string) || JSON.stringify(a);
    }
    if (Array.isArray(a)) {
      return `[${a.map((arr) => arb(arr, p, false)).join(', ')}]`;
    }
    if (typeof a === 'string') {
      if (checkType === 'enum') {
        return a;
      }
      return `${JSON.stringify(a)}`;
    }
    if (typeof a === 'object') {
      if (a === null) {
        return `null`;
      }
      const returnedObjectString = Object.entries(a)
        .filter(([, v]) => typeof v !== 'undefined')
        .map(([k, v]) => `${k}: ${arb(v, [p, k].join(SEPARATOR), false)}`)
        .join(',\n');
      if (!root) {
        return `{${returnedObjectString}}`;
      }
      return returnedObjectString;
    }
    return `${a}`;
  };
  return arb;
};

export const resolverFor = <X, T extends keyof ResolverInputTypes, Z extends keyof ResolverInputTypes[T]>(
  type: T,
  field: Z,
  fn: (
    args: Required<ResolverInputTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : never,
) => fn as (args?: any, source?: any) => ReturnType<typeof fn>;

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export type ZeusHook<
  T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>,
> = ZeusState<ReturnType<T>[N]>;

export type WithTypeNameValue<T> = T & {
  __typename?: boolean;
  __directives?: string;
};
export type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
export type ScalarDefinition = Record<string, ScalarResolver>;

type IsScalar<S, SCLR extends ScalarDefinition> = S extends 'scalar' & { name: infer T }
  ? T extends keyof SCLR
    ? SCLR[T]['decode'] extends (s: unknown) => unknown
      ? ReturnType<SCLR[T]['decode']>
      : unknown
    : unknown
  : S;
type IsArray<T, U, SCLR extends ScalarDefinition> = T extends Array<infer R>
  ? InputType<R, U, SCLR>[]
  : InputType<T, U, SCLR>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;
type BaseZeusResolver = boolean | 1 | string | Variable<any, string>;

type IsInterfaced<SRC extends DeepAnify<DST>, DST, SCLR extends ScalarDefinition> = FlattenArray<SRC> extends
  | ZEUS_INTERFACES
  | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P], SCLR>
          : IsArray<R, '__typename' extends keyof DST ? { __typename: true } : Record<string, never>, SCLR>
        : never;
    }[keyof SRC] & {
      [P in keyof Omit<
        Pick<
          SRC,
          {
            [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
          }[keyof DST]
        >,
        '__typename'
      >]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
    }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends BaseZeusResolver
        ? IsScalar<SRC[P], SCLR>
        : IsArray<SRC[P], DST[P], SCLR>;
    };

export type MapType<SRC, DST, SCLR extends ScalarDefinition> = SRC extends DeepAnify<DST>
  ? IsInterfaced<SRC, DST, SCLR>
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
export type InputType<SRC, DST, SCLR extends ScalarDefinition = {}> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P], SCLR>[keyof MapType<SRC, R[P], SCLR>];
    } & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>, SCLR>
  : MapType<SRC, IsPayLoad<DST>, SCLR>;
export type SubscriptionToGraphQL<Z, T, SCLR extends ScalarDefinition> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z, SCLR>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z, SCLR>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z, SCLR>; errors?: string[] }) => void) => void;
  open: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type FromSelector<SELECTOR, NAME extends keyof GraphQLTypes, SCLR extends ScalarDefinition = {}> = InputType<
  GraphQLTypes[NAME],
  SELECTOR,
  SCLR
>;

export type ScalarResolver = {
  encode?: (s: unknown) => string;
  decode?: (s: unknown) => unknown;
};

export type SelectionFunction<V> = <T>(t: T | V) => T;

type BuiltInVariableTypes = {
  ['String']: string;
  ['Int']: number;
  ['Float']: number;
  ['ID']: unknown;
  ['Boolean']: boolean;
};
type AllVariableTypes = keyof BuiltInVariableTypes | keyof ZEUS_VARIABLES;
type VariableRequired<T extends string> = `${T}!` | T | `[${T}]` | `[${T}]!` | `[${T}!]` | `[${T}!]!`;
type VR<T extends string> = VariableRequired<VariableRequired<T>>;

export type GraphQLVariableType = VR<AllVariableTypes>;

type ExtractVariableTypeString<T extends string> = T extends VR<infer R1>
  ? R1 extends VR<infer R2>
    ? R2 extends VR<infer R3>
      ? R3 extends VR<infer R4>
        ? R4 extends VR<infer R5>
          ? R5
          : R4
        : R3
      : R2
    : R1
  : T;

type DecomposeType<T, Type> = T extends `[${infer R}]`
  ? Array<DecomposeType<R, Type>> | undefined
  : T extends `${infer R}!`
  ? NonNullable<DecomposeType<R, Type>>
  : Type | undefined;

type ExtractTypeFromGraphQLType<T extends string> = T extends keyof ZEUS_VARIABLES
  ? ZEUS_VARIABLES[T]
  : T extends keyof BuiltInVariableTypes
  ? BuiltInVariableTypes[T]
  : any;

export type GetVariableType<T extends string> = DecomposeType<
  T,
  ExtractTypeFromGraphQLType<ExtractVariableTypeString<T>>
>;

type UndefinedKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];

type WithNullableKeys<T> = Pick<T, UndefinedKeys<T>>;
type WithNonNullableKeys<T> = Omit<T, UndefinedKeys<T>>;

type OptionalKeys<T> = {
  [P in keyof T]?: T[P];
};

export type WithOptionalNullables<T> = OptionalKeys<WithNullableKeys<T>> & WithNonNullableKeys<T>;

export type Variable<T extends GraphQLVariableType, Name extends string> = {
  ' __zeus_name': Name;
  ' __zeus_type': T;
};

export type ExtractVariablesDeep<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends string | number | boolean | Array<string | number | boolean>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariablesDeep<Query[K]>> }[keyof Query]>;

export type ExtractVariables<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends [infer Inputs, infer Outputs]
  ? ExtractVariablesDeep<Inputs> & ExtractVariables<Outputs>
  : Query extends string | number | boolean | Array<string | number | boolean>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariables<Query[K]>> }[keyof Query]>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const START_VAR_NAME = `$ZEUS_VAR`;
export const GRAPHQL_TYPE_SEPARATOR = `__$GRAPHQL__`;

export const $ = <Type extends GraphQLVariableType, Name extends string>(name: Name, graphqlType: Type) => {
  return (START_VAR_NAME + name + GRAPHQL_TYPE_SEPARATOR + graphqlType) as unknown as Variable<Type, Name>;
};
type ZEUS_INTERFACES = GraphQLTypes["DBEssentials"]
export type ScalarCoders = {
}
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["DBEssentials"]:AliasType<{
		createdAt?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	_id?:boolean | `@${string}`;
		['...on User']?: Omit<ValueTypes["User"],keyof ValueTypes["DBEssentials"]>;
		['...on Product']?: Omit<ValueTypes["Product"],keyof ValueTypes["DBEssentials"]>;
		__typename?: boolean | `@${string}`
}>;
	["Page"]: AliasType<{
	hasNext?:boolean | `@${string}`,
	total?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Blog"]: AliasType<{
	_id?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	image?:boolean | `@${string}`,
	text?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["AdminMutation"]: AliasType<{
productOps?: [{	_id: string | Variable<any, string>},ValueTypes["ProductsOps"]],
		__typename?: boolean | `@${string}`
}>;
	["PublicMutation"]: AliasType<{
orderProducts?: [{	order: Array<ValueTypes["OrderProducts"]> | Variable<any, string>},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["ProductFilter"]: {
	name?: string | undefined | null | Variable<any, string>,
	/** be careful because this filter can significantly slow down the resolver */
	description?: string | undefined | null | Variable<any, string>,
	fromPrice?: number | undefined | null | Variable<any, string>,
	toPrice?: number | undefined | null | Variable<any, string>,
	available?: boolean | undefined | null | Variable<any, string>,
	/** custom behaviour filters */
	tags?: Array<string> | undefined | null | Variable<any, string>,
	sortDirection?: ValueTypes["SortDirection"] | undefined | null | Variable<any, string>
};
	["User"]: AliasType<{
	_id?:boolean | `@${string}`,
	birthday?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	firstName?:boolean | `@${string}`,
	lastName?:boolean | `@${string}`,
	phone?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["SortDirection"]:SortDirection;
	["Product"]: AliasType<{
	_id?:boolean | `@${string}`,
	available?:boolean | `@${string}`,
	category?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	images?:boolean | `@${string}`,
	isNew?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	quantity?:boolean | `@${string}`,
	rate?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["AddProductFields"]: {
	images: Array<string> | Variable<any, string>,
	available: boolean | Variable<any, string>,
	quantity: number | Variable<any, string>,
	price: number | Variable<any, string>,
	name: string | Variable<any, string>,
	description: string | Variable<any, string>
};
	["OrderProducts"]: {
	quantity: number | Variable<any, string>,
	productId: string | Variable<any, string>
};
	["Mutation"]: AliasType<{
	adminMutation?:ValueTypes["AdminMutation"],
	publicMutation?:ValueTypes["PublicMutation"],
		__typename?: boolean | `@${string}`
}>;
	["UpdateProductFields"]: {
	available?: boolean | undefined | null | Variable<any, string>,
	quantity?: number | undefined | null | Variable<any, string>,
	name?: string | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	price?: number | undefined | null | Variable<any, string>
};
	["PageOptions"]: {
	limit: number | Variable<any, string>,
	skip: number | Variable<any, string>
};
	["Query"]: AliasType<{
getBlog?: [{	id: string | Variable<any, string>},ValueTypes["Blog"]],
	getBlogs?:ValueTypes["Blog"],
	getCategories?:boolean | `@${string}`,
getProduct?: [{	_id: string | Variable<any, string>},ValueTypes["Product"]],
getProducts?: [{	filter?: ValueTypes["ProductFilter"] | undefined | null | Variable<any, string>,	pagination?: ValueTypes["PageOptions"] | undefined | null | Variable<any, string>},ValueTypes["PagedProducts"]],
	me?:ValueTypes["User"],
		__typename?: boolean | `@${string}`
}>;
	["PagedProducts"]: AliasType<{
	pagination?:ValueTypes["Page"],
	products?:ValueTypes["Product"],
		__typename?: boolean | `@${string}`
}>;
	["ProductsOps"]: AliasType<{
addProduct?: [{	fields: ValueTypes["AddProductFields"] | Variable<any, string>},boolean | `@${string}`],
	deleteProduct?:boolean | `@${string}`,
updateProduct?: [{	fields: ValueTypes["UpdateProductFields"] | Variable<any, string>},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>
  }

export type ResolverInputTypes = {
    ["DBEssentials"]:AliasType<{
		createdAt?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	_id?:boolean | `@${string}`;
		['...on User']?: Omit<ResolverInputTypes["User"],keyof ResolverInputTypes["DBEssentials"]>;
		['...on Product']?: Omit<ResolverInputTypes["Product"],keyof ResolverInputTypes["DBEssentials"]>;
		__typename?: boolean | `@${string}`
}>;
	["Page"]: AliasType<{
	hasNext?:boolean | `@${string}`,
	total?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Blog"]: AliasType<{
	_id?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	image?:boolean | `@${string}`,
	text?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["AdminMutation"]: AliasType<{
productOps?: [{	_id: string},ResolverInputTypes["ProductsOps"]],
		__typename?: boolean | `@${string}`
}>;
	["PublicMutation"]: AliasType<{
orderProducts?: [{	order: Array<ResolverInputTypes["OrderProducts"]>},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["ProductFilter"]: {
	name?: string | undefined | null,
	/** be careful because this filter can significantly slow down the resolver */
	description?: string | undefined | null,
	fromPrice?: number | undefined | null,
	toPrice?: number | undefined | null,
	available?: boolean | undefined | null,
	/** custom behaviour filters */
	tags?: Array<string> | undefined | null,
	sortDirection?: ResolverInputTypes["SortDirection"] | undefined | null
};
	["User"]: AliasType<{
	_id?:boolean | `@${string}`,
	birthday?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	firstName?:boolean | `@${string}`,
	lastName?:boolean | `@${string}`,
	phone?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["SortDirection"]:SortDirection;
	["Product"]: AliasType<{
	_id?:boolean | `@${string}`,
	available?:boolean | `@${string}`,
	category?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	images?:boolean | `@${string}`,
	isNew?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	quantity?:boolean | `@${string}`,
	rate?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["AddProductFields"]: {
	images: Array<string>,
	available: boolean,
	quantity: number,
	price: number,
	name: string,
	description: string
};
	["OrderProducts"]: {
	quantity: number,
	productId: string
};
	["Mutation"]: AliasType<{
	adminMutation?:ResolverInputTypes["AdminMutation"],
	publicMutation?:ResolverInputTypes["PublicMutation"],
		__typename?: boolean | `@${string}`
}>;
	["UpdateProductFields"]: {
	available?: boolean | undefined | null,
	quantity?: number | undefined | null,
	name?: string | undefined | null,
	description?: string | undefined | null,
	price?: number | undefined | null
};
	["PageOptions"]: {
	limit: number,
	skip: number
};
	["Query"]: AliasType<{
getBlog?: [{	id: string},ResolverInputTypes["Blog"]],
	getBlogs?:ResolverInputTypes["Blog"],
	getCategories?:boolean | `@${string}`,
getProduct?: [{	_id: string},ResolverInputTypes["Product"]],
getProducts?: [{	filter?: ResolverInputTypes["ProductFilter"] | undefined | null,	pagination?: ResolverInputTypes["PageOptions"] | undefined | null},ResolverInputTypes["PagedProducts"]],
	me?:ResolverInputTypes["User"],
		__typename?: boolean | `@${string}`
}>;
	["PagedProducts"]: AliasType<{
	pagination?:ResolverInputTypes["Page"],
	products?:ResolverInputTypes["Product"],
		__typename?: boolean | `@${string}`
}>;
	["ProductsOps"]: AliasType<{
addProduct?: [{	fields: ResolverInputTypes["AddProductFields"]},boolean | `@${string}`],
	deleteProduct?:boolean | `@${string}`,
updateProduct?: [{	fields: ResolverInputTypes["UpdateProductFields"]},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["schema"]: AliasType<{
	query?:ResolverInputTypes["Query"],
	mutation?:ResolverInputTypes["Mutation"],
		__typename?: boolean | `@${string}`
}>
  }

export type ModelTypes = {
    ["DBEssentials"]: ModelTypes["User"] | ModelTypes["Product"];
	["Page"]: {
		hasNext: boolean,
	total: number
};
	["Blog"]: {
		_id: string,
	createdAt: number,
	image: string,
	text: string,
	title: string
};
	["AdminMutation"]: {
		productOps?: ModelTypes["ProductsOps"] | undefined
};
	["PublicMutation"]: {
		orderProducts?: boolean | undefined
};
	["ProductFilter"]: {
	name?: string | undefined,
	/** be careful because this filter can significantly slow down the resolver */
	description?: string | undefined,
	fromPrice?: number | undefined,
	toPrice?: number | undefined,
	available?: boolean | undefined,
	/** custom behaviour filters */
	tags?: Array<string> | undefined,
	sortDirection?: ModelTypes["SortDirection"] | undefined
};
	["User"]: {
		_id: string,
	birthday: number,
	createdAt: number,
	email: string,
	firstName: string,
	lastName: string,
	phone?: string | undefined,
	updatedAt: number,
	username: string
};
	["SortDirection"]:SortDirection;
	["Product"]: {
		_id: string,
	available: boolean,
	category?: string | undefined,
	createdAt: number,
	description: string,
	images: Array<string>,
	isNew?: boolean | undefined,
	name: string,
	price: number,
	quantity: number,
	rate?: number | undefined,
	updatedAt: number
};
	["AddProductFields"]: {
	images: Array<string>,
	available: boolean,
	quantity: number,
	price: number,
	name: string,
	description: string
};
	["OrderProducts"]: {
	quantity: number,
	productId: string
};
	["Mutation"]: {
		adminMutation?: ModelTypes["AdminMutation"] | undefined,
	publicMutation?: ModelTypes["PublicMutation"] | undefined
};
	["UpdateProductFields"]: {
	available?: boolean | undefined,
	quantity?: number | undefined,
	name?: string | undefined,
	description?: string | undefined,
	price?: number | undefined
};
	["PageOptions"]: {
	limit: number,
	skip: number
};
	["Query"]: {
		getBlog?: ModelTypes["Blog"] | undefined,
	getBlogs: Array<ModelTypes["Blog"]>,
	getCategories?: Array<string> | undefined,
	getProduct?: ModelTypes["Product"] | undefined,
	getProducts?: ModelTypes["PagedProducts"] | undefined,
	me?: ModelTypes["User"] | undefined
};
	["PagedProducts"]: {
		pagination: ModelTypes["Page"],
	products?: Array<ModelTypes["Product"]> | undefined
};
	["ProductsOps"]: {
		addProduct: boolean,
	deleteProduct: boolean,
	updateProduct: boolean
};
	["schema"]: {
	query?: ModelTypes["Query"] | undefined,
	mutation?: ModelTypes["Mutation"] | undefined
}
    }

export type GraphQLTypes = {
    ["DBEssentials"]: {
	__typename:"User" | "Product",
	createdAt: number,
	updatedAt: number,
	_id: string
	['...on User']: '__union' & GraphQLTypes["User"];
	['...on Product']: '__union' & GraphQLTypes["Product"];
};
	["Page"]: {
	__typename: "Page",
	hasNext: boolean,
	total: number
};
	["Blog"]: {
	__typename: "Blog",
	_id: string,
	createdAt: number,
	image: string,
	text: string,
	title: string
};
	["AdminMutation"]: {
	__typename: "AdminMutation",
	productOps?: GraphQLTypes["ProductsOps"] | undefined
};
	["PublicMutation"]: {
	__typename: "PublicMutation",
	orderProducts?: boolean | undefined
};
	["ProductFilter"]: {
		name?: string | undefined,
	/** be careful because this filter can significantly slow down the resolver */
	description?: string | undefined,
	fromPrice?: number | undefined,
	toPrice?: number | undefined,
	available?: boolean | undefined,
	/** custom behaviour filters */
	tags?: Array<string> | undefined,
	sortDirection?: GraphQLTypes["SortDirection"] | undefined
};
	["User"]: {
	__typename: "User",
	_id: string,
	birthday: number,
	createdAt: number,
	email: string,
	firstName: string,
	lastName: string,
	phone?: string | undefined,
	updatedAt: number,
	username: string
};
	["SortDirection"]: SortDirection;
	["Product"]: {
	__typename: "Product",
	_id: string,
	available: boolean,
	category?: string | undefined,
	createdAt: number,
	description: string,
	images: Array<string>,
	isNew?: boolean | undefined,
	name: string,
	price: number,
	quantity: number,
	rate?: number | undefined,
	updatedAt: number
};
	["AddProductFields"]: {
		images: Array<string>,
	available: boolean,
	quantity: number,
	price: number,
	name: string,
	description: string
};
	["OrderProducts"]: {
		quantity: number,
	productId: string
};
	["Mutation"]: {
	__typename: "Mutation",
	adminMutation?: GraphQLTypes["AdminMutation"] | undefined,
	publicMutation?: GraphQLTypes["PublicMutation"] | undefined
};
	["UpdateProductFields"]: {
		available?: boolean | undefined,
	quantity?: number | undefined,
	name?: string | undefined,
	description?: string | undefined,
	price?: number | undefined
};
	["PageOptions"]: {
		limit: number,
	skip: number
};
	["Query"]: {
	__typename: "Query",
	getBlog?: GraphQLTypes["Blog"] | undefined,
	getBlogs: Array<GraphQLTypes["Blog"]>,
	getCategories?: Array<string> | undefined,
	getProduct?: GraphQLTypes["Product"] | undefined,
	getProducts?: GraphQLTypes["PagedProducts"] | undefined,
	me?: GraphQLTypes["User"] | undefined
};
	["PagedProducts"]: {
	__typename: "PagedProducts",
	pagination: GraphQLTypes["Page"],
	products?: Array<GraphQLTypes["Product"]> | undefined
};
	["ProductsOps"]: {
	__typename: "ProductsOps",
	addProduct: boolean,
	deleteProduct: boolean,
	updateProduct: boolean
}
    }
export const enum SortDirection {
	CREATED_ASC = "CREATED_ASC",
	CREATED_DESC = "CREATED_DESC",
	UPDATED_ASC = "UPDATED_ASC",
	UPDATED_DESC = "UPDATED_DESC"
}

type ZEUS_VARIABLES = {
	["ProductFilter"]: ValueTypes["ProductFilter"];
	["SortDirection"]: ValueTypes["SortDirection"];
	["AddProductFields"]: ValueTypes["AddProductFields"];
	["OrderProducts"]: ValueTypes["OrderProducts"];
	["UpdateProductFields"]: ValueTypes["UpdateProductFields"];
	["PageOptions"]: ValueTypes["PageOptions"];
}