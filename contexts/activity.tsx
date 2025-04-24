import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StageStatus = 'blocked' | 'available' | 'completed';

export interface Stage {
  id: number;
  title: string;
  status: StageStatus;
  dependsOn?: number[]; // IDs of stages that need to be completed first
}

type ActivityContextType = {
  stages: Map<number, Stage>;
  isStageAvailable: (stageId: number) => boolean;
  completeStage: (stageId: number) => void;
  getStageStatus: (stageId: number) => StageStatus;
  initializeStages: (
    configStages: Array<{ id: number; title: string; dependsOn?: number[] }>,
  ) => void;
  calculateProgress: () => number;
  resetProgress: () => void;
};

const STORAGE_KEY = 'activity_stages';

const ActivityContext = createContext<ActivityContextType | null>(null);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context)
    throw new Error('useActivity must be used within ActivityProvider');
  return context;
};

export const ActivityProvider: React.FC<{
  children: React.ReactNode;
  activityId: string;
}> = ({ children, activityId }) => {
  const [stages, setStages] = useState<Map<number, Stage>>(new Map());

  // Load saved progress on component mount
  useEffect(() => {
    loadSavedProgress(activityId);
  }, [activityId]);

  const loadSavedProgress = async (id: string) => {
    try {
      const savedData = await AsyncStorage.getItem(`${STORAGE_KEY}_${id}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setStages(new Map(parsedData));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const saveProgress = async (stagesMap: Map<number, Stage>) => {
    try {
      const serialized = JSON.stringify(Array.from(stagesMap.entries()));
      await AsyncStorage.setItem(`${STORAGE_KEY}_${activityId}`, serialized);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const isStageAvailable = (stageId: number): boolean => {
    const stage = stages.get(stageId);
    if (!stage) return false;

    if (stage.status === 'completed') return true;

    if (!stage.dependsOn || stage.dependsOn.length === 0) return true;

    return stage.dependsOn.every((depId) => {
      const depStage = stages.get(depId);
      return depStage?.status === 'completed';
    });
  };

  const updateDependentStages = (
    stagesMap: Map<number, Stage>,
    completedId: number,
  ) => {
    stagesMap.forEach((stage, id) => {
      if (stage.dependsOn?.includes(completedId)) {
        const allDependenciesMet = stage.dependsOn.every(
          (depId) => stagesMap.get(depId)?.status === 'completed',
        );

        if (allDependenciesMet && stage.status === 'blocked') {
          stagesMap.set(id, { ...stage, status: 'available' });
        }
      }
    });
    return stagesMap;
  };

  const completeStage = (stageId: number) => {
    setStages((prevStages) => {
      const updatedStages = new Map(prevStages);
      const stage = updatedStages.get(stageId);

      if (stage && stage.status !== 'completed') {
        // Update the completed stage
        updatedStages.set(stageId, { ...stage, status: 'completed' });

        // Update dependent stages
        updateDependentStages(updatedStages, stageId);

        // Save to AsyncStorage
        saveProgress(updatedStages);
      }

      return updatedStages;
    });
  };

  const getStageStatus = (stageId: number): StageStatus => {
    const stage = stages.get(stageId);
    return stage ? stage.status : 'blocked';
  };

  const initializeStages = (
    configStages: Array<{ id: number; title: string; dependsOn?: number[] }>,
  ) => {
    const newStages = new Map<number, Stage>();

    // First pass: create all stages
    configStages.forEach((cfg) => {
      // Default to 'available' if no dependencies, otherwise 'blocked'
      const initialStatus: StageStatus =
        !cfg.dependsOn || cfg.dependsOn.length === 0 ? 'available' : 'blocked';

      newStages.set(cfg.id, {
        id: cfg.id,
        title: cfg.title,
        status: initialStatus,
        dependsOn: cfg.dependsOn,
      });
    });

    setStages(newStages);
    saveProgress(newStages);
  };

  const calculateProgress = (): number => {
    let completed = 0;
    let total = stages.size;

    stages.forEach((stage) => {
      if (stage.status === 'completed') completed++;
    });

    return total > 0 ? (completed / total) * 100 : 0;
  };

  const resetProgress = () => {
    setStages((prevStages) => {
      const resetStages = new Map<number, Stage>();

      prevStages.forEach((stage, id) => {
        const initialStatus: StageStatus =
          !stage.dependsOn || stage.dependsOn.length === 0
            ? 'available'
            : 'blocked';

        resetStages.set(id, {
          ...stage,
          status: initialStatus,
        });
      });

      saveProgress(resetStages);
      return resetStages;
    });
  };

  return (
    <ActivityContext.Provider
      value={{
        stages,
        isStageAvailable,
        completeStage,
        getStageStatus,
        initializeStages,
        calculateProgress,
        resetProgress,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
