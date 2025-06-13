import {
  Card,
  DataTable,
  Icon,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import { router } from 'expo-router';
import Activity from '../../../../components/Activity';
import { useState } from 'react';
import CustomModal from '../../../../components/Modal';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../../components/Button';
import React from 'react';

export default function Phase2() {
  const data = [
    { A: 0, B: 0, C: 0 },
    { A: 0, B: 1, C: 1 },
    { A: 1, B: 0, C: 1 },
    { A: 1, B: 1, C: 0 },
  ];

  const generateBinaryMatrix = () => {
    return Array.from({ length: 4 }, () =>
      Array.from({ length: 12 }, () => Math.round(Math.random())),
    );
  };

  const [tableA, setTableA] = useState(generateBinaryMatrix());
  const [tableB, setTableB] = useState(generateBinaryMatrix());

  // Estado para tabela de inputs do usuário (string para facilitar input)
  const [tableInput, setTableInput] = useState(
    Array.from({ length: 4 }, () => Array(12).fill('')),
  );

  // Estado para validação global de cada célula, null = sem validação ainda
  const [validationTable, setValidationTable] = useState<(boolean | null)[][]>(
    Array.from({ length: 4 }, () => Array(12).fill(null)),
  );

  // Função para validar e atualizar o input
  const handleInputChange = (row: number, col: number, value: string) => {
    if (value !== '0' && value !== '1' && value !== '') {
      return;
    }
    const newInput = [...tableInput];
    newInput[row][col] = value;
    setTableInput(newInput);

    // Resetar validação daquela célula ao editar
    const newValidation = [...validationTable];
    newValidation[row][col] = null;
    setValidationTable(newValidation);
  };

  // Função XOR
  const xor = (a: number, b: number) => a ^ b;

  // Função para validar todos inputs
  const validateAll = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let emptyCount = 0;

    const newValidation = tableInput.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell === '') {
          emptyCount++;
          return null; // vazio
        }
        const correctVal = xor(
          tableA[rowIndex][colIndex],
          tableB[rowIndex][colIndex],
        );
        if (Number(cell) === correctVal) {
          correctCount++;
          return true;
        } else {
          incorrectCount++;
          return false;
        }
      }),
    );

    setValidationTable(newValidation);

    Alert.alert(
      'Resultado',
      `Corretos: ${correctCount}\nIncorretos: ${incorrectCount}\nVazios: ${emptyCount}`,
    );
    82;
  };

  const renderTable = (title: string, table: number[][], color: string) => (
    <Surface style={styles.tableWrapper} elevation={4}>
      <Text style={[styles.tableTitle, { color }]}>{title}</Text>
      {table.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                { backgroundColor: `${color}20`, borderColor: color },
              ]}
            >
              <Text style={[styles.cellText, { color }]}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </Surface>
  );

  const renderInputTable = () => (
    <Surface style={styles.tableWrapper} elevation={4}>
      {tableInput.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            const validation = validationTable[rowIndex][colIndex];
            let bgColor = '#FFFc';
            if (validation === true) bgColor = '#C8E6C9';
            else if (validation === false) bgColor = '#FFCDD2';

            return (
              <TextInput
                key={colIndex}
                value={cell}
                onChangeText={(text) =>
                  handleInputChange(rowIndex, colIndex, text)
                }
                keyboardType="numeric"
                maxLength={1}
                style={[
                  styles.inputCell,
                  { backgroundColor: bgColor, borderColor: '#2196F3' },
                ]}
              />
            );
          })}
        </View>
      ))}
    </Surface>
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Etapa 1: Validação simples - sempre passa
  const validateIntroduction = async (): Promise<boolean | string> => {
    // Simulação de uma operação assíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  return (
    <Activity.Provider activityId="2">
      <Activity.Root>
        <Activity.Header
          title="2ª Fase: XOR"
          description="A operação XOR (ou exclusivo) é uma operação lógica que compara
                dois bits e retorna 1 se os bits forem diferentes e 0 se forem
                iguais. Essa operação é amplamente utilizada em computação,
                criptografia e circuitos digitais."
          hideReset={true}
        >
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeButtonText}> Início </Text>
          </TouchableOpacity>
        </Activity.Header>
        <Activity.Content>
          <View
            style={{ flexDirection: 'row', marginTop: -20, marginLeft: -10 }}
          >
            <Button onPress={openModal} style={{ borderColor: '#f3f3f3' }}>
              <Icon
                source={require('../../../../assets/info-icon.png')}
                size={30}
              />
            </Button>
          </View>
          <CustomModal visible={isModalVisible} onClose={closeModal}>
            <View style={{ padding: 16 }}>
              <Text
                variant="titleLarge"
                style={{ marginBottom: 12, textAlign: 'center' }}
              >
                EXEMPLO
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: 'justify' }}>
                A operação XOR pode ser representada por uma tabela verdade,
                onde A e B são os bits de entrada e C é o resultado da operação:
              </Text>
            </View>
            <View style={styles.container}>
              <Card>
                <Card.Content>
                  <Text style={styles.title}>Tabela Verdade - A ⊕ B</Text>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title style={styles.col}>
                        <Text variant="labelLarge">A</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.col}>
                        <Text variant="labelLarge">B</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.col}>
                        <Text variant="labelLarge">C</Text>
                      </DataTable.Title>
                    </DataTable.Header>
                    {data.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={styles.col}>
                          <Text>{item.A}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.col}>
                          <Text>{item.B}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.col}>
                          <Text>{item.C}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </Card.Content>
              </Card>
            </View>
          </CustomModal>
          {renderTable('Tabela A', tableA, '#4A148C')}
          {renderTable('Tabela B', tableB, '#00695C')}
          <Text style={styles.tableTitle}>
            Insira os valores de A ⊕ B abaixo:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            style={{ width: '100%' }}
          >
            <View style={{ minWidth: 520 }}>{renderInputTable()}</View>
          </ScrollView>
          <View style={{ alignSelf: 'center', marginBottom: 20 }}>
            <TouchableOpacity style={styles.homeButton} onPress={validateAll}>
              <Text style={styles.homeButtonText}>Validar Todos</Text>
            </TouchableOpacity>
          </View>
        </Activity.Content>
      </Activity.Root>
    </Activity.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  tContainer: {
    margin: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  tableContainer: {
    marginBottom: 24,
  },
  col: {
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  cellText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  tableWrapper: {
    width: '100%',
    marginBottom: 24,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputCell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    textAlign: 'center',
  },
  inputText: {
    width: '100%',
    height: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  homeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
