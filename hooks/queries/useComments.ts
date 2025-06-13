import { useQuery } from '@tanstack/react-query';
import Comment from '../../interfaces/comment';
import api from '../../services/api';

const fetchComments = () => api.get<Comment[]>('/api/comments');

export function useComments() {
  return useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(),
    select: (response) => response.data,
  });
}

export function useCommentById(id: string) {
  return useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const { data } = await api.get<Comment>(`/api/comments/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
