import axios, { AxiosResponse }  from "axios";
import { ILogin, IToken } from "../types/types";
import { log } from "console";

const URL = 'https://dummy-api.d0.acom.cloud'
export const api = {
    get token() {
        return localStorage.getItem('token');
    },
    auth:{
        async login(credentials: ILogin): Promise<IToken> {
            try {
                const { data } = await axios.post<ILogin, AxiosResponse<IToken>>(`${URL}/api/auth/login`, credentials, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return data;
            } catch (error) {
                
                throw error;
            }
        },
        async logOut(){
            try{
                const { data } = await axios.post(`${URL}/api/auth/logout `, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
            }catch(error){
                
                throw error;
            }
        },
        async refresh(){
            try{
                const { data } = await axios.post(`${URL}/api/auth/refresh `, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
            }catch(error){
                
                throw error;
            }
        }
        
    },
    product:{
        async getProducts(page: string){
            try{
                const {data} = await axios.get(`${URL}/api/products?page=${page}`,{
                    headers: {
                        Authorization: `Bearer ${api.token}`,
                    }
                });
                
                return data.data;

            }catch(error){
                
                throw error;
            }
           
        },
        async filterProducts(filterArr :any){

            
            try{
                const queryParams = new URLSearchParams(filterArr);
                const url = `${URL}/api/products?${queryParams.toString()}`;
                const {data} = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${api.token}`,
                    }
                });
                console.log(data);
                
                return data.data;

            }catch(error){
                
                throw error;
            }
           
        }
    }
}