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
