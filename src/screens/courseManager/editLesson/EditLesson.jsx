import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import {
  GET_LESSONS,
  GET_COVERIMG,
  GET_VIDEO,
  VIDEO_COVER,
  LESSON_IMG
} from '../../../utils/urlConstants'
import useGetFetchData from '../../../utils/useGetFetchData'
import { updateLesson } from '../../../actions/lessonActions'

import DashboardLayout from '../../../layout/dashboardLayout/DashboardLayout'
import BackButton from '../../../components/backButton/BackButton'
import { ErrorText } from '../../../components/formUI/FormUI'
import DragDrop from '../../../components/dragDrop/DragDrop'
import Image from '../../../components/lessonImage/Image'
import Video from '../../../components/videoPlayer/Video'
import Text from '../addLesson/Text'
import '../addLesson/AddLesson.scss'
import AddTestModal from '../../../components/addTestModal/AddTestModal'

const EditLesson = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm()
  const { data, isLoading } = useGetFetchData(
    'editLessonData',
    GET_LESSONS + `/${id}`
  )

  const fetchImg = data?.data?.coverImg
  const title = data?.data?.title
  const [lessonTitle, setLessonTitle] = useState()
  const [lessonCover, setLessonCover] = useState(fetchImg)
  //   const [videoModal, setVideoModal] = useState(false)
  //   const [imageModal, setImageModal] = useState(false)
  //   const [textModal, setTextModal] = useState(false)
  const [testModal, setTestModal] = useState(false)
  //   const [testModal, setTestModal] = useState(false)
  const [lessonData, setLessonData] = useState([])
  const textData = data?.data?.texts.map((text) => {
    return { text }
  })
  const videoData = data?.data?.videos.map((video) => {
    return { video }
  })
  const photoData = data?.data?.photos.map((photo) => {
    return { photo }
  })
  useEffect(() => {
    setLessonData([textData, videoData, photoData])
  }, [])

  if (isLoading) {
    return <span>Loading</span>
  }
  let newData
  if (lessonData) {
    newData = lessonData.flat()
  }

  const lessonId = data?.data?.id
  const updateLessonForm = ({ title }) => {
    const coverImg = lessonCover
    dispatch(updateLesson(title, coverImg, lessonId))
  }
  console.log(newData)

  return (
    <>
      {testModal && <AddTestModal setTestModal={setTestModal} />}
      <DashboardLayout title='Edit lesson'>
        <BackButton location={`/admin/course/${data?.data?.courseId}`} />
        <div className='admin-lesson-create-container'>
          <input
            type='text'
            placeholder='Write title here'
            value={lessonTitle}
            name='title'
            ref={register({
              required: {
                value: true,
                message: 'You must enter lesson title'
              }
            })}
            defaultValue={title}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <ErrorText
            className='errorMsg'
            message={errors.title && errors.title.message}
          />
          <DragDrop
            onChange={(img) => setLessonCover(img)}
            img={GET_COVERIMG + data?.data?.coverImg}
            editText='Drag & Drop image in this area or Click Here to edit image'
          />
          <div className='admin-lesson-create-btn-wrapper'>
            <button
              className='secondary-btn'
              onClick={() => setTestModal(true)}
            >
              <img src='/img/test-outline.svg' alt='test icon' />{' '}
              <span>Add test</span>
            </button>
          </div>
          {newData
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            .map((data, index) => (
              <div key={index}>
                <Text
                  heading={data?.textHeading}
                  desc={data?.textDescription}
                />
                <Video
                  title={data?.videoTitle}
                  description={data?.videoDescription}
                  url={
                    data?.videoLink === 'undefined'
                      ? `${GET_VIDEO}${data?.videoResource}`
                      : data?.videoLink
                  }
                  thumbnail={`${VIDEO_COVER}${data?.videoCover}`}
                />

                {data?.lessonImg === undefined ? (
                  ''
                ) : (
                  <Image
                    src={`${LESSON_IMG}${data?.lessonImg}`}
                    desc={data?.isImgDesc === true && data?.photoDescription}
                  />
                )}
              </div>
            ))}
          <div className='save-lesson-modal'>
            <h4>Do you want to edit lesson?</h4>
            <div>
              <button className='secondary-btn' id='lesson-cancel-btn'>
                Cancel
              </button>
              <button
                className='primary-btn secondary-btn'
                id='lesson-save-btn'
                onClick={handleSubmit(updateLessonForm)}
              >
                Edit Lesson
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default React.memo(EditLesson)
