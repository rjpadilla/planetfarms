import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import Button from '../../../components/button/Button'
import { configFunc } from '../../../utils/apiFunc'
import './LessonTest.scss'

const LessonTest = ({ id }) => {
  const [start, setStart] = useState()
  const [results, setResults] = useState([])
  const [tests, setTests] = useState([])
  const history = useHistory()

  const startTest = async () => {
    const currentDate = moment().toDate().getTime().toString()
    const config = configFunc()
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user_tests/start`,
      { lessonId: id, startTime: currentDate }, config)
    setStart(data)
  }

  useEffect(() => {
    if (start) {
      history.push(`/lesson-test-page/${start.id}`)
    }
    getTestsResults()
  }, [start])

  const getTestsResults = async () => {
    const config = configFunc()
    const { data: { tests } } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tests/lesson/${id}`)
    setTests(tests)
    if (tests.length > 0) {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user_tests/test/${tests[0].id}`, config)
      setResults(data.tests)
    }
  }
  return (
    <div className='lesson-test-panel'>
      <div className='lesson-test-panel-left'>
        {tests.length > 0
          && <>
          <h3>Lesson test</h3>
          <p>
            Make a lesson test where you can use new information that you know
          </p>
            <div className='lesson-test-btn-wrapper'>
              <Button name='Start test' onClick={startTest} />
            </div>
            </>
        }
      </div>
      {tests.length > 0 && <div className='lesson-test-panel-right'>
        <h4>My results</h4>
        {results.length > 0
          ? <div className='test-result-container'>
            {results.length > 2 && <h4 className='show-more'>Show all results</h4>}
            <div>
              {
          results.splice(0, 2).map((item, index) => {
            return (
              <div className='test-attempt'>
                <div className='marks-obtained'>
                  <h4>{index === 0 ? 'First attempt' : 'Second attempt'}: <span>{item.marks}/{item.total_marks}</span></h4>
                  <p>{item.test_taken}</p>
                </div>
                {
                  item.is_passed
                    ? <button className='default-btn'>
                      Success
                    </button>
                    : <button className='default-btn red-bg'>
                      failed
                    </button>
                }

              </div>
            )
          })
          }
            </div>
          </div>
          : <div className='lesson-test-panel-right--attempts'>
            <h4>You didn't finish test yet.</h4>
            </div>}
      </div>}
    </div>
  )
}
export default LessonTest