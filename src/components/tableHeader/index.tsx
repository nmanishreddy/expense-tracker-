
export{}
// import React from 'react'
// import { useState } from 'react'
// // import {FontAwesomeIcon} from '@fontawesome/react-fontawesome';

// type props = {
//     headers : {
//         Header: string,
//         accessor: string,
//         sortable: boolean
//       }[],
//       onSorting : (a: string, b: string) => void
// }
// // typeof onSorting : (a: string) => void


// const TableHeader = (props: props) => {
//     const [sortingField, setSortingField] = useState('')
//     const [sortingOrder, setSortingOrder] = useState('asc');

//     const onSortingChange = (field : string) => {
//         const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

//         setSortingField(field)
//         setSortingOrder(field)
//         props.onSorting(field,order)

//     }
//     return (
//         <thead>
//             <tr>
//                 {props.headers.map((item) => (
//                     <th key={item.accessor}
//                        onClick={() => sortable ? onSortingChange(field) : null}
//                     >{item.Header} 
//                     {
//                         sortingField && sortingField === field && (
//                             <FontAwesomeIcon icon={sortingOrder === 'asc' ? 'arrow=down' : 'arrow-up'}
//                             />
//                         )
//                     }
                    
                    
//                     </th>
//                 ))}
//             </tr>
//         </thead>
//     )
// }

// export default TableHeader;