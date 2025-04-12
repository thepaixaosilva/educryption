import { useQuery } from '@tanstack/react-query';
import Content from '../../interfaces/content';
import api from '../../services/api';

const fetchContents = () => api.get<Content[]>('/contents');

export function useContents() {
  return useQuery({
    queryKey: ['contents'],
    queryFn: () => fetchContents(),
    select: (response) => response.data,
  });
}

export function useContentById(id: string) {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data } = await api.get<Content>(`/contents/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
