/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	AdminMutation:{
		productOps:{

		}
	},
	PublicMutation:{
		orderProducts:{
			order:"OrderProducts"
		}
	},
	ProductFilter:{
		sortDirection:"SortDirection"
	},
	SortDirection: "enum" as const,
	AddProductFields:{

	},
	OrderProducts:{

	},
	UpdateProductFields:{

	},
	PageOptions:{

	},
	Query:{
		getBlog:{

		},
		getProduct:{

		},
		getProducts:{
			filter:"ProductFilter",
			pagination:"PageOptions"
		}
	},
	ProductsOps:{
		addProduct:{
			fields:"AddProductFields"
		},
		updateProduct:{
			fields:"UpdateProductFields"
		}
	}
}

export const ReturnTypes: Record<string,any> = {
	DBEssentials:{
		"...on User": "User",
		"...on Product": "Product",
		createdAt:"Int",
		updatedAt:"Int",
		_id:"String"
	},
	Page:{
		hasNext:"Boolean",
		total:"Int"
	},
	Blog:{
		_id:"String",
		createdAt:"Int",
		image:"String",
		text:"String",
		title:"String"
	},
	AdminMutation:{
		productOps:"ProductsOps"
	},
	PublicMutation:{
		orderProducts:"Boolean"
	},
	User:{
		_id:"String",
		birthday:"Int",
		createdAt:"Int",
		email:"String",
		firstName:"String",
		lastName:"String",
		phone:"String",
		updatedAt:"Int",
		username:"String"
	},
	Product:{
		_id:"String",
		available:"Boolean",
		category:"String",
		createdAt:"Int",
		description:"String",
		images:"String",
		isNew:"Boolean",
		name:"String",
		price:"Int",
		quantity:"Int",
		rate:"Int",
		updatedAt:"Int"
	},
	Mutation:{
		adminMutation:"AdminMutation",
		publicMutation:"PublicMutation"
	},
	Query:{
		getBlog:"Blog",
		getBlogs:"Blog",
		getCategories:"String",
		getProduct:"Product",
		getProducts:"PagedProducts",
		me:"User"
	},
	PagedProducts:{
		pagination:"Page",
		products:"Product"
	},
	ProductsOps:{
		addProduct:"Boolean",
		deleteProduct:"Boolean",
		updateProduct:"Boolean"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}