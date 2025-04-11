import { useMutation, useQueryClient } from '@tanstack/react-query';
import Content from '../../interfaces/content';
import api from '../../services/api';

const createContent = (content: Content) =>
  api.post<Content>('/contents', content);

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: Content) => createContent(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

const updateContent = (content: Content) =>
  api.put<Content>(`/contents/${content.id}`, content);

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: Content) => updateContent(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

const deleteContent = (id: number) => api.delete<Content>(`/contents/${id}`);

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};
