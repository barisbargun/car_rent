import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { axios } from "../axios/axios"
import { AxiosError } from "axios"

/**
 * 
 * useMutation Functions
 *  
 */

// Post Methods
export const _usePostMutation = <T>(queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutationData<T>) => axios.post(data.path, data.body),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}

// Patch Methods
export const _usePatchMutation = <T>(queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutationData<T>) => axios.patch(`${data.path}`, data.body),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}

// Delete Methods

export const _useDeleteMutation = (queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { path: string }) => axios.delete(`${data.path}`),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}

/**
 * 
 * useQuery Functions
 *  
 */

export const _useQuery = <T>(query_key: QUERY_KEYS, path: string) => {
  return useQuery({
    queryKey: [query_key],
    queryFn: () => axios.get(path)
      .then(res => res.data as T)
      .catch((error: AxiosError) => {
        if (error.response)
          throw error.response;
        throw error;
      }),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  })
}
