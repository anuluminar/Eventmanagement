import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const viewEventResponseContext = createContext()

export const viewEventUserResponseContext = createContext()

export const editEventUserResponseContext = createContext()

export const editUserContext = createContext()

export const isAuthTokenContext = createContext()

export const bookContext = createContext()

export const adminviewbook = createContext()

export const bookdeleteadmin = createContext()

export const finalbookContext = createContext()

function Context({ children }) {

  const [addeventResponse, setaddeventRespone] = useState({})
  const [viewEventResponse, setViewEventResponse] = useState({})
  const [editEventResponse, setEditEventResponse] = useState({})
  const [isAuthToken, setIsAuthToken] = useState(true)
  const [viewEditResponse, setViewEditResponse] = useState({})
  const [book, setBook] = useState({})
  const [viewbook, setviewbook] = useState({})
  const [deleteadminbook, setdeleteadminbook] = useState({})


  return (
    <>
      <viewEventResponseContext.Provider value={{ addeventResponse, setaddeventRespone }}>
        <viewEventUserResponseContext.Provider value={{ viewEventResponse, setViewEventResponse }}>
          <editEventUserResponseContext.Provider value={{ editEventResponse, setEditEventResponse }}>
            <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
              <editUserContext.Provider value={{ viewEditResponse, setViewEditResponse }}>
                <bookContext.Provider value={{ book, setBook }}>
                  <adminviewbook.Provider value={{ viewbook, setviewbook }}>
                    <bookdeleteadmin.Provider value={{ deleteadminbook, setdeleteadminbook }}>
                        {children}
                    </bookdeleteadmin.Provider>
                  </adminviewbook.Provider>
                </bookContext.Provider>
              </editUserContext.Provider>
            </isAuthTokenContext.Provider>
          </editEventUserResponseContext.Provider>
        </viewEventUserResponseContext.Provider>
      </viewEventResponseContext.Provider>
    </>
  )
}

export default Context