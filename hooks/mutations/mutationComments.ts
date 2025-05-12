import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from '../../interfaces/comment';
import api from '../../services/api';

const createComment = (comment: Partial<Comment>) =>
  api.post<Comment>('/api/comments', comment);

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (response) => {
      const comment = response.data;
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.setQueryData(['comment', comment.id], comment);
    },
  });
}

const updateComment = (comment: Comment) =>
  api.put<Comment>(`/api/comments/${comment.id}`, comment);

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (_res, comment) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comment', comment.id] });
    },
  });
}

const deleteComment = (id: number) => api.delete(`/api/comments/${id}`);

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_res, id) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
    },
  });
}
