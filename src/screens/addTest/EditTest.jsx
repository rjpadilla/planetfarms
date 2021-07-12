import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { createTest } from '../../actions/testActions'
import DashboardLayout from '../../layout/dashboardLayout/DashboardLayout'
import './AddTest.scss'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const EditTest = () => {
    const { lessonId } = useParams()
    const { pathname } = useLocation()

    const history = useHistory()
    const [formError, setFormError] = useState(false)

    const [newQuestions, setNewQuestions] = useState([])
    const [questions, setQuestions] = useState([])
    // data structure of questions
    // [{
    //   question: "",
    //   answer: "",
    //   options: []
    // }]

    const dispatch = useDispatch()

    useEffect(() => {
        getLessonQuestions()
    }, [])

    async function getLessonQuestions() {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/questions/lesson/${lessonId}`)
        setNewQuestions(data.questions)
        setQuestions(data.questions)
    }

    function addQuestion() {
        setQuestions(prev => [...prev, { question: '', answer: '', options: [] }])
        setFormError(false)
    }

    function resetQuestion() {
        setQuestions([])
        setFormError(false)
    }

    function editTest() {
        
    }

    return (
        <DashboardLayout
            title={pathname === `/admin/edit-test/${lessonId}`
                ? 'Edit Test'
                : 'Add Test'
            }>
            <div>
                <div className='add-test-container'>
                    <div>
                        <div className='add-test-inner-container'>
                            {/* {questions.length > 0 && questions.map((index, item) => <QuestionAnswerComponent pos={questions.length - 1} index={index} questions={questions} questionError={questionError} />)} */}
                            {questions.length > 0 && questions.map((item, index) => <QuestionAnswerComponent
                                pos={questions.length - 1}
                                index={index}
                                questions={questions}
                                newQuestions={newQuestions}
                                setFormError={setFormError}
                                formError={formError}
                                editTest={editTest}
                            />)}

                            <button onClick={() => addQuestion()} className='secondary-btn add-question-btn'><img src='/img/plus.svg' alt='add icon' /><span>Add question</span></button>
                            <div className='btn-container'>
                                <button className='secondary-btn reset-test-btn' onClick={resetQuestion}>Reset test</button>
                                <button className='secondary-btn color-primary' onClick={(editTest)}>Edit test</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

function QuestionAnswerComponent({ pos, questions, index, newQuestions, setFormError, formError }) {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [options, setOptions] = useState([''])
    const [newOptions, setNewOptions] = useState([])

    useEffect(() => {
        
            setQuestion(newQuestions[index].question)
            setAnswer(newQuestions[index].answer)
            setNewOptions(newQuestions[index].options)
            setOptions(newQuestions[index].options)
        
    }, [])

    function onQuestionChange(e) {
        setQuestion(e.target.value)
        setFormError(false)
    }

    function onAnswerChange(e) {
        setAnswer(e.target.value)
        setFormError(false)
    }

    function addOption() {
        setOptions(prev => {
            return [...prev, '']
        })
        setFormError(false)
    }

    return (
        <div className='question-answer-container' key={index}>
            {formError && <p className='error-message test-error'>Please fill out all the input.</p>}
            <div className='question-container'>
                <div>
                    <input
                        className='default-input-variation'
                        placeholder='Question'
                        value={question}
                        onChange={(e) => onQuestionChange(e)}
                    />
                </div>
                <button><img src='/img/green-camera.svg' alt='photo icon' /> <h4>Add photo</h4></button>
            </div>
            <div className='test-answers-wrapper'>
                <div className='test-correct-answer'>
                    <h4>Write correct answer in this field</h4>
                    <div className='test-answer-input-field'>
                        <input className='default-input-variation' placeholder='Correct answer' value={answer} onChange={(e) => onAnswerChange(e)} />
                        <img src='/img/minus-circle-outline.svg' alt='minus image' onClick={() => setAnswer('')} />
                    </div>
                    <span>Answer will be mixed for users</span>
                </div>
                <div className='option-answers'>
                    {options.length > 0 && options.map((item, index) =>
                        <OptionAnswer
                            options={options}
                            pos={index}
                            setOptions={setOptions}
                            newOptions={newOptions}
                            item={item}
                            setFormError={setFormError}
                            newQuestions={newQuestions}
                        />)}
                    <button onClick={addOption}><img src='/img/plus.svg' alt='add icon' /> <span>Add new answer</span></button>
                </div>
            </div>
        </div>
    )
}

function OptionAnswer({ options, setOptions, item, pos, newOptions, setFormError, newQuestions }) {
    const [answer, setAnswer] = useState('')
    const { register: regi, handleSubmit, errors } = useForm()
    function onAnswerChange(e) {
        setAnswer(e.target.value)
        setFormError(false)
    }

    //  function addOption() {
    //     setOptions(prev => {
    //       if(prev === '') {
    //         return [...prev]
    //       }
    //       return [...prev, '']
    //     })
    //   }
    useEffect(() => {
        // if(options.includes('')) {
        //   options.splice(-1, 1)
        // }
        // if(answer.length ) {
        //   addOption()
        // }

        if (newOptions.length > 0) {
            setAnswer(newOptions[pos])
        }
    }, [newOptions, newQuestions])

    function removeItem(id) {
        const newOptions = [...options]
        const index = newOptions.indexOf(id)
        console.log(index)
        if (index !== -1) {
            newOptions.splice(index, 1)
            setOptions(newOptions)
        }
    }

    return (
        <div className='test-answer-input-field' key={pos}>
            <input
                className='default-input-variation incorrect-option'
                placeholder='Incorrect answer' value={answer} onChange={(e) => onAnswerChange(e)}
            />
            <img src='/img/minus-circle-outline.svg' alt='minus image' onClick={() => removeItem(item)} />
        </div>
    )
}

export default EditTest