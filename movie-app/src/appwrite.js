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

const updateSearchCount = async (searchTerm, movie) => {
    /**
   * Logic
   * 1. Use Appwrite API to check the DB if the searchTerm exist
   * 2. If it does, update the count
   * 3. If it doesn't, create a new entry with the search term and count = 1
   */

  try {
    // Use Appwrite API to check the DB if the searchTerm exist
    // The listDocument method accepts 3 paramameter, the database and collection id we want to list our document from. then an array that checks if our query serchterm is equal to the searchterm in our database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
      Query.equal('searchTerm', searchTerm)
    ])

    // If it does, update the count
    if(result.documents.length > 0) {
      const doc = result.document[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, { count: doc.count + 1, })
    }
    //  If it doesn't, create a new entry with the search term and count = 1
    else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm, 
        count: 1, 
        movieID : movie.id,
        posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      } )
    }

  } catch (error) {
    console.log(error);
  }
}


export default updateSearchCount;


export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")])

    return result.documents;
  }catch(error) {
    console.error(error);
  }
}