import { useMutation, useQueryClient } from '@tanstack/react-query';
import Content from '../../interfaces/content';
import api from '../../services/api';

const createContent = (content: Partial<Content>) =>
  api.post<Content>('/api/contents', content);

export function useCreateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContent,
    onSuccess: (response) => {
      const content = response.data;
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.setQueryData(['content', content.id], content);
    },
  });
}

const updateContent = (content: Content) =>
  api.put<Content>(`/api/contents/${content.id}`, content);

export function useUpdateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContent,
    onSuccess: (_data, content) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.invalidateQueries({ queryKey: ['content', content.id] });
    },
  });
}

const deleteContent = (id: number) => api.delete(`/api/contents/${id}`);

export function useDeleteContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContent,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.invalidateQueries({ queryKey: ['content', id] });
    },
  });
}
