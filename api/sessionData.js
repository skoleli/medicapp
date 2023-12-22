import Env from "../Env"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RequestURL = {
    allDrugs: '',
    drugCategories: '',
    addDrugUrl: '',
    remindersUrl:'',
}

export const setURLs = async()=>{
    const user_id = await AsyncStorage.getItem('user_id') 
    const base_url = Env.HOST
    RequestURL.allDrugs = `${base_url}/users/${user_id}/all_drugs/table`
    drugCategoriesUrl= `${base_url}/users/${user_id}/drug_categories/table`
    addDrugUrl= `${base_url}users/${user_id}/drugs`
    remindersUrl= `${base_url}users/${user_id}/drugs/table`
}

export const getAllDrugs = async (url, token, page = 1, pagesize = 200) => {
    const requestData = {
        page: page,
        pageSize: pagesize,
        search: '',
        sort: {
            drug_category_name: 'asc',
        },
    };
    console.log('request geldi:', requestData)
    console.log(url)
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(38)
        console.log(response.ok, response.status, response.statusText)
        if (response.ok) {
            console.log(40)
            const responseData = await response.json();
            console.log(responseData)
            return responseData['records'];
        } else {
            console.log(45)
            const errorData = response.status
            throw new Error(`Request failed: ${errorData}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while getting drugs: ${error.message}`);
    }
};

export const getDrugCategories = async (url, token, page = 1, pageSize = 50) => {
    const requestData = {
        page: page,
        pageSize: pagesize,
        search: '',
        filters: [],
        sort: {
            name: 'desc'
        },
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData['records'];
        } else {
            const errorData = await response.json();
            throw new Error(`Request failed: ${errorData.message}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while getting drug categories: ${error.message}`);
    }
};


export const addReminder = async (url,token, drugId, dosageFreq, isFasting, startDate, endDate) => {
    const requestData = {
        drug_id: drugId,
        dosage_frequency: dosageFreq,
        is_fasting: isFasting,
        start_date: startDate,
        endDate: endDate,
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        })
        if (response.ok) {
            const responseData = await response.json();
            // update reminders
            await getReminders();
            return true;
        } else {
            const errorData = await response.json();
            throw new Error(`Request failed: ${errorData.message}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while adding reminder: ${error.message}`);
    }
};

export const getReminders = async (url,token) => {
    const requestData = {
        page: 1,
        pageSize: 100,
        search: '',
        sort: {
            'drug_category_name': 'asc',
        },
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData['records'];
        } else {
            const errorData = await response.json();
            throw new Error(`Something went wrong while getting reminders: ${errorData.message}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while getting reminders: ${error.message}`);
    }
};