import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export function useApi(key, endpoint, options = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => api.get(endpoint).then(r => r.data),
    ...options
  })
}

export function useApiMutation(endpoint, method = 'post', options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => api[method](endpoint, data).then(r => r.data),
    onSuccess: (data) => {
      if (options.invalidate) {
        options.invalidate.forEach(key => queryClient.invalidateQueries({ queryKey: [key] }))
      }
      options.onSuccess?.(data)
    },
    onError: options.onError,
    ...options
  })
}
