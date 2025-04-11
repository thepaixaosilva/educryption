import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from '../../interfaces/comment';
import api from '../../services/api';

const createComment = (comment: Comment) =>
  api.post<Comment>('/comments', comment);

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: Comment) => createComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const updateComment = (comment: Comment) =>
  api.put<Comment>(`/comments/${comment.id}`, comment);

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const deleteComment = (id: number) => api.delete<Comment>(`/comments/${id}`);

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
