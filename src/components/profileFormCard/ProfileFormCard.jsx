import React from 'react'
import './ProfileFormCard.scss'

const ProfileFormCard = ({ data: { title, firstTitle, firstValue, secondTitle, secondValue, thirdTitle, thirdValue } }) => {
  return (
    <div className='myProfile-container'>
      <h2 className='myProfile-container-row-title'>{title}</h2>
      <div className='myProfile-container-row'>
        <div className='form-group'>
          <label>{firstTitle}</label>
          <p>{firstValue}</p>
        </div>
        <div className='form-group'>
          <label>{secondTitle}</label>
          <p>{secondValue}</p>
        </div>
        {thirdTitle &&
          <div className='form-group'>
            <label>{thirdTitle}</label>
            <p>{thirdValue}</p>
          </div>}
      </div>
    </div>
  )
}

export const PersonalInformation = ({ user }) => {
  const PersonalInformationdata = {
    title: 'Personal information',
    firstTitle: 'First Name',
    firstValue: user?.firstName || 'N/A',
    secondTitle: 'Last Name',
    secondValue: user?.lastName || 'N/A',
    thirdTitle: 'Date of birhday',
    thirdValue: user?.dateOfBirth ? new Date(user?.dateOfBirth).toDateString() : 'N/A'
  }
  return (

    <>
      <ProfileFormCard data={PersonalInformationdata} />
    </>
  )
}

export const ContactInformation = ({ user }) => {
  const ContactInformationdatadata = {
    title: 'Contact information',
    firstTitle: 'Email',
    firstValue: user?.email || 'N/A',
    secondTitle: 'Phone',
    secondValue: user?.phone || 'N/A'
  }
  return (
    <ProfileFormCard data={ContactInformationdatadata} />
  )
}

export const AdditionalInformation = ({ user }) => {
  const AdditionalInformationdata = {
    title: 'Additional information',
    firstTitle: 'Last login',
    firstValue: user?.lastLogin ? new Date(user?.lastLogin).toDateString() : 'N/A',
    secondTitle: 'Numbers of visits',
    secondValue: user?.numberOfVisit || 'N/A'
  }
  return (
    <ProfileFormCard data={AdditionalInformationdata} />
  )
}
