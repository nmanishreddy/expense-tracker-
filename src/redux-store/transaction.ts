export interface Transaction {
    id: number
    name: string 
    amount: number 
    type: string 
    category: string

}

export interface Category {
    id: number 
    name: string
    type: string 
}

    
export const transactionType = [
    {type:'select' , id:'0'},
    {type: 'income', id: '1'},
    {type: 'expense', id: '2'}
]

export const transactionCategory = [
    
    {category: "category1", id: '1',type:'income'},
    {category: "category2", id: '2',type:'income'},
    {category: "category3", id: '3',type:'income'},
    {category: "category4", id: '4',type:'income'},
    {category: "category5", id: '5',type:'income'},
    {category: "category6", id: '6',type:'expense'},
    {category: "category7", id: '7',type:'expense'},
    {category: "category8", id: '8',type:'expense'},
    {category: "category9", id: '9',type:'expense'},
    {category: "category10", id: '10',type:'expense'}
]



//-----Currency------


export interface Currency {
    id: string 
    name: string
}

export const CurrencyTypes =[
    {type:'rupee', id:'rupee'},
    {type:'usd', id:'usd'},
    {type:'pound', id:'pound'},
    {type:'cad', id:'cad'},
]