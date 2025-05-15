import { config } from 'dotenv'
import { get } from 'env-var' 

config({path: 'envarioment.env'})

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString()

} 