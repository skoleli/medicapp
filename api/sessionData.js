
// import { Alert } from "react-native";
// import Env from "../Env";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// const SessionURL = {
//     user_id: AsyncStorage.getItem('user_id'),
//     allDrugsUrl: `${Env.HOST}users/${user_id}/all_drugs_table`,
//     drugCategoriesUrl: `${Env.HOST}users/${user_id}/drug_categories_table`,
//     addDrugsUrl: `${Env.HOST}users/${user_id}/drugs`,
//     remindersUrl: `${Env.HOST}users/${user_id}/drugs/table`,
// };


// export const getAllDrugs = async (page=1, pagesize=200) => {
//     const requestData = {
//         page: page,
//         pageSize: pagesize,
//         search: '',
//         sort: {
//             drug_category_name: 'asc'
//         }
//     }
//     try {
//         const response = await fetch(SessionURL.allDrugsUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': AsyncStorage.getItem(token),
//             },
//             body: JSON.stringify(requestData),
//         })
//         if (response.ok) {
//             const responseData = await response.json();
//             return responseData['records']
//         } else {
//             const errorData = await response.json();
//             throw new Error(`Request failed: ${errorData.message}`)
//         }
//     } catch (error) {
//         console.error('get all drugs error:', error.message)
//         throw new Error(`Something went wrong while getting drugs: ${error.message}`)

//     }
// }


// export const getDrugCategories = async (page=1, pageSize=50) => {
//     const requestData = {
//         page: page,
//         pageSize: pagesize,
//         search: '',
//         filters: [],
//         sort: {
//             name: 'desc'
//         },
//     }
//     try {
//         const response = await fetch(SessionURL.drugCategoriesUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': AsyncStorage.getItem(token),
//             },
//             body: JSON.stringify(requestData),
//         })
//         if (response.ok) {
//             const responseData = await response.json();
//             return responseData.records
//         } else {
//             const errorData = await response.json();
//             throw new Error( `Request failed: ${errorData.message}`)
//         }
//     } catch (error) {
//         console.error('get drug categories error:', error.message)
//         throw new (`Something went wrong while getting drug categories: ${error.message}`)
//     }
// }


// export const addReminder = async (drugId, dosageFreq, isFasting, startDate, endDate) => {
//     const requestData = {
//         drug_id: drugId,
//         dosage_frequency: dosageFreq,
//         is_fasting: isFasting,
//         start_date: startDate,
//         endDate: endDate,
//     }
//     try {
//         const response = await fetch(SessionURL.drugCategoriesUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': AsyncStorage.getItem(token),
//             },
//             body: JSON.stringify(requestData),
//         })
//         if (response.ok) {
//             const responseData = await response.json();
//             // update reminders
//             getReminders()
//             return ''
//         } else {
//             const errorData = await response.json();
//             throw new Error(`Something went wrong while adding reminder: ${errorData.message}`)
//         }
//     } catch (error) {
//         console.error('add reminder error:', error.message)
//         throw new Error( `Something went wrong while adding reminder: ${error.message}`)

//     }
// }

// export const getReminders = async () => {
//     const requestData = {
//         page: 1,
//         pageSize: 100,
//         search: '',
//         sort: {
//             'drug_category_name': 'asc',
//         },
//     }
//     try {
//         const response = await fetch(SessionURL.drugCategoriesUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': AsyncStorage.getItem(token),
//             },
//             body: JSON.stringify(requestData),
//         })
//         if (response.ok) {
//             const responseData = await response.json();
//             await AsyncStorage.setItem('reminders', responseData['records'])
//             return ''
//         } else {
//             const errorData = await response.json();
//             return `Something went wrong while getting reminders: ${errorData.message}`
//         }
//     } catch (error) {
//         console.error('get reminders error:', error.message)
//         return `Something went wrong while getting reminders: ${error.message}`

//     }
// }