import config from '../../../knexfile.mjs'
import knex from 'knex'

export default knex(config.development)