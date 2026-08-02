import { useEffect } from 'react'
import { APP_NAME } from '../app/config'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`
  }, [title])
}
