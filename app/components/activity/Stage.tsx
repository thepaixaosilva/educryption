import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useActivity } from '../../../contexts/activity';

interface StageProps {
  id: number;
  children: React.ReactNode;
  renderBlocked?: () => React.ReactNode;
  /**
   * Optional validation function that will be called before marking the stage as complete
   * Returns a Promise that resolves to true if validation passes, or false otherwise
   * Can also return a string with the error message in case of failure
   */
  validateCompletion?: () => Promise<boolean | string>;
  /**
   * Custom text for the completion button
   */
  completeButtonText?: string;
}

export default function Stage({
  id,
  children,
  renderBlocked,
  validateCompletion,
  completeButtonText = 'Mark as Complete',
}: StageProps) {
  const { isStageAvailable, getStageStatus, completeStage, stages } =
    useActivity();
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const status = getStageStatus(id);
  const available = isStageAvailable(id);
  const stage = stages.get(id);

  // If the stage is blocked and we have a custom renderer
  if (!available && renderBlocked) {
    return renderBlocked();
  }

  // Default view for blocked stage
  if (!available) {
    return (
      <View style={[styles.stage, styles.blocked]}>
        <Text style={styles.blockedTitle}>{stage?.title || `Stage ${id}`}</Text>
        <Text style={styles.blockedText}>
          Complete the previous stages to unlock this one.
        </Text>
      </View>
    );
  }

  const handleComplete = async () => {
    // If there's no validation function, simply complete the stage
    if (!validateCompletion) {
      completeStage(id);
      return;
    }

    setValidating(true);
    setValidationError(null);

    try {
      const validationResult = await validateCompletion();

      // If validation returns true, complete the stage
      if (validationResult === true) {
        completeStage(id);
      }
      // If it's a string, it's an error message
      else if (typeof validationResult === 'string') {
        setValidationError(validationResult);
      }
      // If it's false, display a generic error message
      else {
        setValidationError('Validation failed. Please review your answers.');
      }
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setValidating(false);
    }
  };

  return (
    <View style={[styles.stage, styles[status]]}>
      <View style={styles.header}>
        <Text style={styles.title}>{stage?.title || `Stage ${id}`}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[styles.statusIndicator, styles[`${status}Indicator`]]}
          />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      {validationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{validationError}</Text>
        </View>
      )}

      {status !== 'completed' && (
        <TouchableOpacity
          style={[
            styles.completeButton,
            validating && styles.completeButtonDisabled,
          ]}
          onPress={handleComplete}
          disabled={validating}
        >
          {validating ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>{completeButtonText}</Text>
          )}
        </TouchableOpacity>
      )}

      {status === 'completed' && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ Completed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  content: {
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: '#E8FFF0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  blocked: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  available: {
    backgroundColor: 'white',
    borderColor: '#2196F3',
  },
  completed: {
    backgroundColor: '#E8FFF0',
    borderColor: '#4CAF50',
  },
  blockedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9e9e9e',
    marginBottom: 8,
  },
  blockedText: {
    color: '#9e9e9e',
    fontStyle: 'italic',
  },
  blockedIndicator: {
    backgroundColor: '#9e9e9e',
  },
  availableIndicator: {
    backgroundColor: '#2196F3',
  },
  completedIndicator: {
    backgroundColor: '#4CAF50',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#FFEBEE',
    borderRadius: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
});
