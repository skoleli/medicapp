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
    RequestURL.drugCategoriesUrl= `${base_url}/users/${user_id}/drug_categories/table`
    RequestURL.addDrugUrl= `${base_url}/users/${user_id}/drugs`
    RequestURL.remindersUrl= `${base_url}/users/${user_id}/drugs/table`
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
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData['records'];
        } else {
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
        pageSize: pageSize,
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
            const errorData = response.status
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
            // update reminders
            const ok = await setReminders(token);
            return ok;
        } else {
            throw new Error(`Request failed: ${errorData}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while adding reminder: ${error.message}`);
    }
};

export const setReminders = async (token) =>{
    try{
    await setURLs()
    const responseData = await getReminders(RequestURL.remindersUrl, token)
    await AsyncStorage.setItem('reminders', JSON.stringify(responseData))
    return true
    }catch(error){
        return false
    }
}


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
            const errorData = response.status
            throw new Error(`Something went wrong while getting reminders: ${errorData.message}`);
        }
    } catch (error) {
        throw new Error(`Something went wrong while getting reminders: ${error.message}`);
    }
};