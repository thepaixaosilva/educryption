import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import Activity from '../../../../components/Activity';

const DESActivitySBox = () => {
  const stages = [
    {
      id: 1,
      title: 'Divisão em blocos',
    },
    {
      id: 2,
      title: 'Separar extremidades',
      dependsOn: [1],
    },
    {
      id: 3,
      title: 'S-Box',
      dependsOn: [2],
    },
    {
      id: 4,
      title: 'Concatenar',
      dependsOn: [3],
    }
  ];

  return (
    <Activity.Provider activityId="des_function3">
      <ActivityContent initialStages={stages} />
    </Activity.Provider>
  );
};

// Interface para as props do ActivityContent
interface ActivityContentProps {
  initialStages: Array<{
    id: number;
    title: string;
    dependsOn?: number[];
  }>;
}

const ActivityContent: React.FC<ActivityContentProps> = ({ initialStages }) => {
  const router = useRouter();
  const activity = Activity.useActivity(); // Agora o hook está dentro do componente
  const { stages, calculateProgress, initializeStages } = activity;

  // Colocar a string que vem da expansão
  const [inputBits, setInputBits] = useState('110010101011110111001100111101111000001010101100');

  // Estados para armazenar os resultados de cada etapa
  const [blocks, setBlocks] = useState<string[]>([]); // 8 blocos de 6 bits
  const [rowCols, setRowCols] = useState<{ row: string; col: string }[]>([]); // Linhas e colunas extraídas
  const [sBoxValues, setSBoxValues] = useState<number[]>([]); // Valores das S-Boxes
  const [finalResult, setFinalResult] = useState(''); // Resultado concatenado

  const sBox = 
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ]  

  // Estados para os inputs do usuário
  const [userRowCols, setUserRowCols] = useState<{ row: string; col: string }[]>(Array(8).fill(null).map(() => ({ row: '', col: '' })));
  const [userSBoxValues, setUserSBoxValues] = useState<string[]>(Array(8).fill(''));

  useEffect(() => {
    if (!stages || stages.size === 0) {
      initializeStages(initialStages);
    }
  }, [stages.size, initializeStages, initialStages]);

  const handleReset = () => {
    Alert.alert('Progresso redefinido', 'Todas as etapas foram reiniciadas.');
    // Limpar as respostas também
    setBlocks([]);
    setRowCols([]);
    setSBoxValues([]);
    setFinalResult('');
    setUserRowCols(Array(8).fill(null).map(() => ({ row: '', col: '' })));
    setUserSBoxValues(Array(8).fill(''));
  };

  // Funções de validação para cada etapa

  // Função para dividir a entrada em 8 blocos de 6 bits
  const divideIntoBlocks = () => {
    if (inputBits.length !== 48) {
      Alert.alert('Erro', 'A entrada deve ter exatamente 48 bits.');
      return;
    }

    const newBlocks = [];
    for (let i = 0; i < 8; i++) {
      newBlocks.push(inputBits.substring(i * 6, (i + 1) * 6));
    }
    setBlocks(newBlocks);
  };

  // Validação da etapa 1 - Divisão de blocos
  const validateDivision = async (): Promise<boolean | string> => {
    if (blocks.length !== 8 || blocks.some(block => block.length !== 6)) {
      return 'Algo está errado';
    }

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].length !== 6 || /[^01]/.test(blocks[i])) {
        return `Bloco B${i + 1} precisa conter exatamente 6 bits (apenas 0 e 1).`;
      }
    }

    const correctBlocks = [];
    for (let i = 0; i < 8; i++) {
      correctBlocks.push(inputBits.substring(i * 6, (i + 1) * 6));
    }

    for (let i = 0; i < 8; i++) {
      if (blocks[i] !== correctBlocks[i]) {
        return `O bloco B${i + 1} está incorreto.`;
      }
    }

    return true;
  };

  // Validação da etapa 2 - Separação das extremidades
  const validateRowCol = async (): Promise<boolean | string> => {
    // Verificar se todos os campos foram preenchidos
    for (let i = 0; i < 8; i++) {
      if (userRowCols[i].row === '' || userRowCols[i].col === '') {
        return `Por favor, preencha a linha e coluna para o bloco ${i + 1}.`;
      }
    }

    // Calcular os valores esperados
    const correctRowCols = blocks.map(block => {
      const row = block[0] + block[5];
      const col = block.slice(1, 5);
      return { row, col };
    });

    // Verificar se os valores inseridos estão corretos
    for (let i = 0; i < 8; i++) {
      const userRow = userRowCols[i].row;
      const userCol = userRowCols[i].col;
      
      if (userRow !== correctRowCols[i].row || userCol !== correctRowCols[i].col) {
        return `Os valores de linha e coluna para o bloco ${i + 1} estão incorretos.`;
      }
    }

    setRowCols(correctRowCols);
    return true;
  };

  // Validação da etapa 3 - Valores S-Box
  const validateSBox = async (): Promise<boolean | string> => {
    // Verificar se todos os campos foram preenchidos
    for (let i = 0; i < 8; i++) {
      if (userSBoxValues[i] === '') {
        return `Por favor, preencha o valor S-Box para o bloco ${i + 1}.`;
      }
    }

    // Calcular os valores esperados
    const correctSBoxValues = rowCols.map((rc) => {
      const rowIndex = parseInt(rc.row, 2);
      const colIndex = parseInt(rc.col, 2);
      return sBox[rowIndex][colIndex];
    });

    // Verificar se os valores inseridos estão corretos
    for (let i = 0; i < 8; i++) {
      const userValue = parseInt(userSBoxValues[i]);
      
      if (userValue !== correctSBoxValues[i]) {
        return `O valor S-Box para o bloco ${i + 1} está incorreto.`;
      }
    }

    setSBoxValues(correctSBoxValues);
    return true;
  };

  // Validação da etapa 4 - Concatenação
  const validateConcatenation = async (): Promise<boolean | string> => {
    // Converter cada valor S-Box para 4 bits e concatenar
    const concatenatedResult = sBoxValues
      .map(val => val.toString(2).padStart(4, '0'))
      .join('');
    
    setFinalResult(concatenatedResult);
    return true;
  };

  // Atualizar linha e coluna para um bloco específico
  const updateRowCol = (index: number, field: 'row' | 'col', value: string) => {
    const newUserRowCols = [...userRowCols];
    newUserRowCols[index] = { ...newUserRowCols[index], [field]: value };
    setUserRowCols(newUserRowCols);
  };

  // Atualizar valor S-Box para um bloco específico
  const updateSBoxValue = (index: number, value: string) => {
    const newUserSBoxValues = [...userSBoxValues];
    newUserSBoxValues[index] = value;
    setUserSBoxValues(newUserSBoxValues);
  };
  
  return (
    <Activity.Root>
      <Activity.Header
        title="Função 3: S-Box"
        subtitle="Aplicando conceitos de Confusão e Substituição"
        onReset={handleReset}
        hideReset={false}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </Activity.Header>

      <Activity.Content>
        {/* Etapa 1: Divisão em blocos */}
        <Activity.Stage 
          id={1} 
          validateCompletion={validateDivision}
          completeButtonText="Conferir">         
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Entrada de 48 bits (encontrada na última função):</Text>
            <Text style={styles.bitsDisplay}>{inputBits}</Text>
          </View>

          <Text style={styles.infoTitle}>Insira os valores nos blocos:</Text>
          <View style={styles.blocksList}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View key={index} style={styles.blockItem}>
                <Text style={styles.blockLabel}>B{index + 1}</Text>
                <TextInput
                  style={styles.blockInput}
                  keyboardType="numeric"
                  maxLength={6}
                  value={blocks[index] || ''}
                  onChangeText={(text) => {
                    const updatedBlocks = [...blocks];
                    updatedBlocks[index] = text;
                    setBlocks(updatedBlocks);
                  }}
                />
              </View>
            ))}
          </View>
        </Activity.Stage>

        {/* Etapa 2: Separar extremidades para encontrar linha e coluna */}
        <Activity.Stage 
          id={2} 
          validateCompletion={validateRowCol}
          completeButtonText="Conferir"
        >
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Bloco</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Linha</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Coluna</Text>
            </View>
            
            {blocks.map((block, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {`B${index + 1}: ${block}`}
                </Text>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={userRowCols[index].row}
                  onChangeText={(value) => updateRowCol(index, 'row', value)}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="Linha"
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={userRowCols[index].col}
                  onChangeText={(value) => updateRowCol(index, 'col', value)}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="Coluna"
                />
              </View>
            ))}
          </View>
        </Activity.Stage>

        {/* Etapa 3: Encontrar valores nas tabelas S-Box */}
        <Activity.Stage 
          id={3} 
          validateCompletion={validateSBox}
          completeButtonText="Conferir"
        >
          <ScrollView horizontal={true} style={styles.sBoxScrollView}>
            <View style={styles.sBoxContainer}>
              <Text style={styles.sBoxTitle}>S-Box</Text>

              <View style={styles.table}>
                {/* Cabeçalho das colunas */}
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}></Text>
                  {[...Array(16).keys()].map(col => (
                    <Text key={col} style={styles.tableHeaderCell}>{col.toString(2).padStart(4, "0")}</Text>
                  ))}
                </View>

                {/* Linhas da tabela S-box */}
                {sBox.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>{rowIndex.toString(2).padStart(2, "0")}</Text>
                    {row.map((cell, colIndex) => (
                      <Text
                        key={colIndex}
                        style={[
                          styles.tableCell,
                          rowCols.some(rc => 
                            parseInt(rc.row) === rowIndex && parseInt(rc.col) === colIndex
                          )
                            ? styles.highlightedCell
                            : null
                        ]}
                      >
                        {cell}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Bloco</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Linha</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Coluna</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Valor S-Box</Text>
            </View>
            
            {blocks.map((block, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {`B${index + 1}`}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {rowCols[index]?.row}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {rowCols[index]?.col}
                </Text>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={userSBoxValues[index]}
                  onChangeText={(value) => updateSBoxValue(index, value)}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="?"
                />
              </View>
            ))}
          </View>
        </Activity.Stage>

        {/* Etapa 4: Concatenar resultados */}
        <Activity.Stage 
          id={4} 
          validateCompletion={validateConcatenation}
          completeButtonText="Concatenar valores binários"
        >
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Bloco</Text>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Valor encontrado</Text>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Valor em binário</Text>
            </View>
            
            {sBoxValues.map((value, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {`B${index + 1}`}
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {value}
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {value.toString(2).padStart(4, '0')}
                </Text>
              </View>
            ))}
          </View>

          {finalResult && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Resultado Final (32 bits):</Text>
              <Text style={styles.resultValue}>{finalResult}</Text>
            </View>
          )}
        </Activity.Stage>

        {/* Mensagem final */}
        <Activity.Reward message="Parabéns! Você completou com sucesso a função 3 da segunda fase do DES. Passe para a próxima etapa!" />
      </Activity.Content>
    </Activity.Root>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1976D2',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bitsDisplay: {
    fontFamily: 'monospace',
    fontSize: 16,
    letterSpacing: 2,
    marginVertical: 8,
  },
  blocksContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  blocksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  blockItem: {
    width: '22%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  blockLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#555',
  },
  blockValue: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  tableContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#333',
    padding: 8,
    width: 45,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 8,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    padding: 8,
    width: 45
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    margin: 4,
    textAlign: 'center',
  },
  sBoxScrollView: {
    flexGrow: 0,
    marginVertical: 16,
  },
  sBoxContainer: {
    marginRight: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sBoxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden'
  },
  highlightedCell: {
    backgroundColor: '#BBDEFB',
    fontWeight: 'bold',
  },
  valuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  valueItem: {
    width: '22%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  valueLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#555',
  },
  valueNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  valueBinary: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  resultBox: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    alignItems: 'center',
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#2E7D32',
  },
  resultValue: {
    fontFamily: 'monospace',
    fontSize: 16,
    letterSpacing: 2,
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
  blockInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 6,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
  },
  blockInputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default DESActivitySBox;
