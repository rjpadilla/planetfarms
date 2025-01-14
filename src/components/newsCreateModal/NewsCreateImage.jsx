import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '../button/Button'
import DragDrop from '../dragDrop/DragDrop'
import CollectionModalHeader from './CollectionModalHeader'
import { TextArea, ErrorText } from '../formUI/FormUI'
import ToggleSwitch from '../toggleSwitch/ToggleSwitch'

import './NewsCreateModal.scss'

const CreateImage = ({
  imageActive,
  setImageActive,
  lessonData,
  setLessonData,
  setLessonImgDataToPost
}) => {
  const [isImgDesc, setIsImgDesc] = useState(false)
  const [lessonImg, setLessonImg] = useState(null)

  const { register, errors, handleSubmit } = useForm()

  const submitLessonImg = ({ photoDescription }) => {
    const imgData = [
      ...lessonData,
      {
        lessonImg,
        photoDescription,
        isImgDesc
      }
    ]
    setLessonData(imgData)
    setLessonImgDataToPost({ lessonImg, photoDescription, isImgDesc })
    setImageActive(false)
  }

  return (
    <>
      {imageActive && (
        <div className='collection-modal-container'>
          <div>
            <div className='collection-modal-inner-container'>
              <CollectionModalHeader
                title='Add photo'
                clickHandler={setImageActive}
              />
              <DragDrop onChange={(img) => setLessonImg(img)} />
              <div className='description'>
                <label>Add photo description ?</label>{' '}
                <ToggleSwitch
                  onClick={() => setIsImgDesc(!isImgDesc)}
                  isFree={isImgDesc}
                />
              </div>
              {isImgDesc ? (
                <div className='photo-input-container'>
                  <TextArea
                    placeholder='Enter image description'
                    className='default-input-variation text-area-variation textarea'
                    cols='3'
                    rows='7'
                    name='photoDescription'
                    ref={register({
                      required: {
                        value: true,
                        message: 'Please enter a photo description'
                      }
                    })}
                  />
                  <ErrorText
                    className='errorMsg'
                    message={
                      errors.photoDescription && errors.photoDescription.message
                    }
                  />
                </div>
              ) : (
                <div />
              )}
              <Button
                name='Add block'
                onClick={handleSubmit(submitLessonImg)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateImage
