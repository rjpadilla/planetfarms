import React, { useEffect, useState } from 'react'
import Filter from '../Filter/Filter'
import SearchComponent from '../SearchComponent/SearchComponent'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useHistory } from 'react-router-dom'
import './CoursesHeader.css'

const data = [
  {
    name: 'All courses',
    slug: '/courses'
  },
  {
    name: 'My courses & collections',
    slug: '/courses/my-courses'
  },
  {
    name: 'Users collections',
    slug: '/courses/users'
  },
  {
    name: 'My collections',
    slug: '/courses/my-collection'
  }
]

const CoursesHeader = ({ setActive, setCreateCollection, location, setCreateCourse }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const { pathname } = useLocation()
  console.log(pathname)
  const history = useHistory()

  const dispatch = useDispatch()
  const [search, setSearch] = useState(null)

  useEffect(() => {
    // if (!userInfo) {
    //     history.push('/login')
    // }
    // if (search) dispatch(searchResources(search))
    // if (!search) dispatch(listResources())

    // window.addEventListener('resize', function () {
    //   setWindowWidth(window.innerWidth)
    // })

    return () => {
      window.removeEventListener('resize', function () {
        setWindowWidth(window.innerWidth)
      })
    }
  }, [windowWidth, search, dispatch, history, userInfo])

  function createCollection () {
    setActive(true)
    setCreateCollection(true)
  }

  return (
    <div className='courses-main-header-container'>
      <div className='courses-container'>
        {windowWidth > 839
          ? <><ul className='courses-list-container'>
            {
              data.map(item => {
                return (
                  <li>
                    <Link
                      className={`nav-link ${(pathname === `${item.slug}`)
                    ? 'courses-list-item active'
                    : 'library-list-item'}`} to={`${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
            <div className='courses-search-container'>
              <SearchComponent search={search} setSearch={setSearch} className='search-btn margin-0' />
            </div>
          </>
          : <>
            <Filter data={data} newFilter='new' />
            <div className='courses-search-container'>
              <SearchComponent search={search} setSearch={setSearch} className='search search-btn margin-0' />
            </div>
          </>}
      </div>
      <div className='courses-sub-header'>
        <div className='courses-sub-header-1'>

          <div className='courses-btn-container'>
            {
              pathname === '/admin/courses'
                ? <button className='default-btn' onClick={() => setCreateCourse(true)}>Add new Courses</button>
                : <button className='default-btn' onClick={() => setCreateCourse(true)}>Add Courses</button>
            }
          </div>

        </div>

        <div className='courses-sub-header-2'>
          <Filter name='filter by category' />
        </div>
      </div>
    </div>
  )
}

export default CoursesHeader