import { Client, Account, Databases, Avatars, Query, ID} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';

const data = {
  databaseId: import.meta.env.VITE_DATABASE_ID,
  userCollectionId: 'users',
  businessCollectionId: 'businesses',
  reviewsCollectionId: 'reviews'
}


const databases = new Databases(client)
export const avatars = new Avatars(client)

export const createUser = async (userData) => {
  try {
    const newUser = await databases.createDocument(data.databaseId, data.userCollectionId, userData.accountId, {
      accountId: userData.accountId,
      email: userData.email,
      username: userData.username,
      avatar: userData.avatar
    })
    return newUser
  }catch(e) {
    throw new Error(e)
  }
}

export const updateUser = async (userData) => {
  function sortAlphabetically(list) {
    return list.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  try {
    const updatedUser = await databases.updateDocument(data.databaseId, data.userCollectionId, userData.accountId, {
      hobbies: JSON.stringify(sortAlphabetically(userData.hobbies)),
      characteristics: JSON.stringify(sortAlphabetically(userData.characteristics)),
      gender: userData.gender,
      age: userData.age,
      region: userData.region
    })
    return updatedUser;

  }catch(e) {
    throw new Error(e)
  }
}

export const getUserAvatar = async (id) => {
  try {
    const user = await databases.getDocument(data.databaseId, data.userCollectionId, id);
    return user.avatar
  } catch (e) {
    throw new Error(e)
  }
}

export const getBusinessesByCriteria = (type, region) => {
  try {
    if (type === '' && region === '') {
      const businesses = databases.listDocuments(data.databaseId, data.businessCollectionId)
      return businesses;
    } else if (type === '') {
      const businesses = databases.listDocuments(data.databaseId, data.businessCollectionId, [Query.equal('region', region)])
      return businesses;
    } else if (region === '') {
      const businesses = databases.listDocuments(data.databaseId, data.businessCollectionId, [Query.equal('type', type)])
      return businesses;
    } else {
      const businesses = databases.listDocuments(data.databaseId, data.businessCollectionId, [Query.equal('type', type), Query.equal('region', region)])
      return businesses;
    }
  } catch(e) {
    throw new Error(e)
  }
}

export const getBusinessById = (id) => {
  try {
    const business = databases.getDocument(data.databaseId, data.businessCollectionId, id)
    return business;
  } catch (e) {
    throw new Error(e)
  }
}

export const createReview = async (businessId, content, stars, creatorId, creatorUsername) => {
  try {
    const review = await databases.createDocument(
      data.databaseId,
      data.reviewsCollectionId,
      ID.unique(),
      {
        content,
        businessId,
        creatorId,
        creatorUsername,
        stars
      }
    )

    const allReviews = await databases.listDocuments(
      data.databaseId,
      data.reviewsCollectionId,
      [
        Query.equal('businessId', businessId)
      ]
    )

    let s = 0;
    for (let i = 0; i < allReviews.documents.length; i++) {
      s+=allReviews.documents[i].stars
    }

    s /= allReviews.documents.length;
    console.log(s)

    await databases.updateDocument(
      data.databaseId,
      data.businessCollectionId,
      businessId,
      {
        review: s
      }
    );

    return review;
  } catch(e) {
    throw new Error(e)
  }
}

export const getAllReviews = async (businessId) => {
  try {
    const reviews = await databases.listDocuments(data.databaseId, data.reviewsCollectionId, 
      [
        Query.equal('businessId', businessId),
        Query.orderDesc('$createdAt'),
        Query.limit(7)
      ]
    )

    return reviews.documents;
  } catch (e) {
    throw new Error(e)
  }
}

export const findAMate = async (formData) => {
  function sortAlphabetically(list) {
    return list.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  try {
    const mates = await databases.listDocuments(data.databaseId, data.userCollectionId, [
      Query.equal('age', formData.age),
      Query.equal('gender', formData.gender),
      Query.equal('characteristics', JSON.stringify(sortAlphabetically(formData.characteristics))),
      Query.equal('hobbies', JSON.stringify(sortAlphabetically(formData.hobbies))),
      Query.equal('region', formData.region)
    ])
    if (mates.total === 0) throw new Error('Nu s-a putut gasi nici un coleg pentru criteriile tale!')
    
    return mates.documents;
  } catch (e) {
    throw new Error(e.message)
  }
}