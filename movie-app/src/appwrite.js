// Import all appwrite parameters from .env
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

// Import app writes functionalities from appwrite
import { Client, Databases, ID, Query } from 'appwrite';

// Used to gain access to appwrites functionalities by creating a new client
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

// Defining the functionality we want to use which is database
const database = new Databases(client);

// Function to track searches made by different users. It will take the searchTerm and associated movie as parameter
