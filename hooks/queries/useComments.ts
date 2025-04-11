import { useQuery } from '@tanstack/react-query';
import Comment from '../../interfaces/comment';
import api from '../../services/api';

const fetchComments = () => api.get<Comment[]>('/comments');

export function useComments() {
  return useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(),
    select: (response) => response.data,
  });
}
