import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Activity from '../../../../components/Activity';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CybersecurityActivityWithValidation = () => {
  const stages = [
    { id: 1, title: 'Fase 4: P-Box', },
  ]

  return (
    <Activity.Provider activityId="cybersecurity_101_with_validation">
      <ActivityContent initialStages={stages} />
    </Activity.Provider>
  )
}

interface ActivityContentProps {
  initialStages: Array<{
    id: number
    title: string
    dependsOn?: number[]
  }>
}

const ActivityContent: React.FC<ActivityContentProps> = ({ initialStages }) => {
  const router = useRouter()
  const activity = Activity.useActivity()
  const { stages, calculateProgress, initializeStages } = activity

  // Estado para resposta do usuário
  const [answers, setAnswers] = useState({
    userGrid: Array.from({ length: 4 }, () => Array(8).fill('')), //8 x 4 linhas
  })
  
  //Tabela P-Box
  const pBox =
    [
      [16, 7, 20, 21, 29, 12, 28, 17],
      [1, 15, 23, 26, 5, 18, 31, 10],
      [2, 8, 24, 14, 32, 27, 3, 9],
      [19, 13, 30, 6, 22, 11, 4, 25]
    ]
  const [rowCols, setRowCols] = useState<{ row: string; col: string }[]>([])

  useEffect(() => {
    if (stages.size === 0) {
      initializeStages(initialStages)
    }
  }, [stages.size, initializeStages, initialStages])

  const handleReset = () => {
    Alert.alert('Progresso redefinido', 'Todas as etapas foram reiniciadas.')
    setAnswers({
      userGrid: Array.from({ length: 4 }, () => Array(8).fill('')),
    })
  }

  const handleChange = (text: string, rowIndex: number, colIndex: number) => {
    const updatedGrid = [...answers.userGrid]
    updatedGrid[rowIndex][colIndex] = text
    setAnswers({ ...answers, userGrid: updatedGrid })
  }

  // Estado para etapa de validação
  const [validationGrid, setValidationGrid] = useState(
    Array.from({ length: 4 }, () => Array(8).fill(null))
  )

  // Função de validação
  const validation = async (): Promise<boolean | string> => {
    //Resposta correta
    const correctGrid = [
      ['', '', '', '', '', '', '', ''],
      ['1', '', '', '', '0', '', '', ''],
      ['0', '', '', '', '', '', '0', ''],
      ['', '', '', '', '', '', '1', ''],
    ]

    // Mapeia se o valor está preenchido ou nulo
    const newUserGrid = answers.userGrid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const correctValue = correctGrid[rowIndex][colIndex]
        if (cell === '') return null
        return cell === correctValue
      })
    )
    setValidationGrid(newUserGrid)

    // Atualiza cores com base na validação
    setAnswers((prev) => ({
      ...prev,
      userGrid: answers.userGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          newUserGrid[rowIndex][colIndex] === false ? cell : cell
        )
      ),
    }))

    // Verifica se tem 5 valores preenchidos
    const totalFilled = answers.userGrid.flat().filter((val) => val !== '').length
    if (totalFilled !== 5) return 'Faltam valores a serem preenchidos'

    // Verifica se todos os valores preenchidos estão corretos
    const allCorrect = newUserGrid.every((row) =>
      row.every((cell) => cell === true || cell === null)
    )
    return allCorrect || 'Alguns valores estão incorretos'
  }

   //===================== QR CODE ===============================
  const [desbloqueado, setDesbloqueado] = useState<boolean | null>(null)
  useEffect(() => {
    const verificarDesbloqueio = async () => {
      const json = await AsyncStorage.getItem('atividadesDesbloqueadas')
      const desbloqueadas = json ? JSON.parse(json) : []

      if (!desbloqueadas.includes('2ª Fase DES - Função 4: P-Box')) { //nome da atividade extraída do QR Code
        Alert.alert(
          'Atividade bloqueada',
          'Você precisa escanear o QR Code para desbloquear esta atividade.',
          [{ text: 'OK', onPress: () => router.replace('/(authenticated)/(tabs)/qr-scan') }]
        );
        setDesbloqueado(false)
      } else {
        setDesbloqueado(true)
      }
    }

    verificarDesbloqueio()
  }, [])
  
  if (desbloqueado === null) return null
  if (!desbloqueado) return null
   //===================== QR CODE ===============================

  return (
    <Activity.Root>
      <Activity.Header
        title="Fase 4: P-Box"
        subtitle="Permutação de 32 bits"
        description="Nessa fase, utiliza-se uma tabela que define uma permutação dos 32 bits. Para o exercício, vamos trabalhar com os 5 primeiros valores do bloco. Se precisar de mais informações, consulte o material da aula."
        onReset={handleReset}
        hideReset={false}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/(authenticated)/(tabs)/home')}
        >
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </Activity.Header>

      <Activity.Content>
        {/* Etapa: Preenchimento da tabela */}
        <Activity.Stage
          id={1}
          validateCompletion={validation}
          completeButtonText="Validar tabela"
        >
          <Text style={styles.sectionSubTitle}>Valores iniciais do bloco</Text>
          <View style={styles.valueContainer}>
            <View style={styles.valueBlock}>
              <Text style={styles.valueText}>1</Text>
              <View style={styles.underline} />
              <Text style={styles.positionText}>posição 1</Text>
            </View>
            <View style={styles.valueBlock}>
              <Text style={styles.valueText}>0</Text>
              <View style={styles.underline} />
              <Text style={styles.positionText}>posição 2</Text>
            </View>
            <View style={styles.valueBlock}>
              <Text style={styles.valueText}>0</Text>
              <View style={styles.underline} />
              <Text style={styles.positionText}>posição 3</Text>
            </View>
            <View style={styles.valueBlock}>
              <Text style={styles.valueText}>1</Text>
              <View style={styles.underline} />
              <Text style={styles.positionText}>posição 4</Text>
            </View>
            <View style={styles.valueBlock}>
              <Text style={styles.valueText}>0</Text>
              <View style={styles.underline} />
              <Text style={styles.positionText}>posição 5</Text>
            </View>
          </View>

          <Text style={styles.sectionSubTitle}> Tabela usada para expansão</Text>
          <ScrollView horizontal
            contentContainerStyle={styles.BoxScrollViewContent}
            style={styles.BoxScrollView}
          >
            <View style={styles.BoxContainer}>

              <View style={styles.table}>
                {/* Cabeçalho das colunas */}
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}></Text>
                  {[...Array(8).keys()].map(col => (
                    <Text key={col} style={styles.tableHeaderCell}>{col}</Text>
                  ))}
                </View>
                {/* Linhas da tabela S-box */}
                {pBox.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>{rowIndex}</Text>
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

          <Text style={styles.paragraph}>
            Com base na posição indicada na tabela, coloque os valores iniciais do bloco no local correto:
          </Text>

          <ScrollView horizontal
            contentContainerStyle={styles.BoxScrollViewContent}
            style={styles.BoxScrollView}
          >
            <View style={styles.BoxContainer}>

              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}></Text>
                  {[...Array(8).keys()].map(col => (
                    <Text key={col} style={styles.tableHeaderCell}>{col}</Text>
                  ))}
                </View>

                {answers.userGrid.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>{rowIndex}</Text>
                    {row.map((cell, colIndex) => {
                      const isCorrect =
                        validationGrid[rowIndex][colIndex]
                      return (
                        <TextInput
                          key={colIndex}
                          style={[
                            styles.tableCell,
                            isCorrect === true && styles.correctCell,
                            isCorrect === false && styles.incorrectCell,
                          ]}
                          maxLength={1}
                          keyboardType="numeric"
                          value={cell}
                          onChangeText={(text) =>
                            handleChange(text, rowIndex, colIndex)
                          }
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </Activity.Stage>

        <Activity.Reward message="Parabéns! Você completou a etapa de permutação do bloco." />
      </Activity.Content>
    </Activity.Root>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  sectionSubTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  correctCell: {
    backgroundColor: '#d4edda',
  },
  incorrectCell: {
    backgroundColor: '#f8d7da',
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
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 19,
    marginTop: 10,
  },
  valueBlock: {
    alignItems: 'center',
    marginBottom: 28
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  underline: {
    height: 2,
    backgroundColor: '#999',
    width: '70%',
    marginTop: 6,
    marginBottom: 4,
  },
  positionText: {
    fontSize: 10.5,
    color: '#666',
  },
  BoxScrollView: {
    flexGrow: 0,
    marginVertical: 20,
    maxHeight: 400
  },
  BoxScrollViewContent: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  BoxContainer: {
    marginRight: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
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
    fontSize: 14,
    color: '#333',
    padding: 8,
    minWidth: 50
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
    minWidth: 50,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  highlightedCell: {
    backgroundColor: '#BBDEFB',
    fontWeight: 'bold',
  },
})

export default CybersecurityActivityWithValidation
