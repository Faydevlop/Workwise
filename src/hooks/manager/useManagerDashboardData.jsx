import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosConfig'

const useManagerDashboardData = (userId) => {
  const [meetings, setMeetings] = useState([])
  const [projects, setProjects] = useState([])
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/manager/dashboard/${userId}`)
        setMeetings(response.data.upcomingMeetings)
        setProjects(response.data.projects)
        setLeaves(response.data.leaves)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { meetings, projects, leaves, loading, error }
}

export default useManagerDashboardData
