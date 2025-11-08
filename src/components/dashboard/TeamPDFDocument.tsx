import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { PlayerInfo } from '../../context/AppStateContext';
import { SERVER_URL } from '../../utils/constants';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas/helvetica@1.0.1/Helvetica.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas/helvetica@1.0.1/Helvetica-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#446950',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  playerCard: {
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e6ede8',
    borderRadius: 8,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  playerPhoto: {
    width: 90,
    height: 90,
    marginRight: 15,
    borderRadius: 30,
  },
  playerName: {
    fontSize: 18,
    color: '#446950',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 12,
    color: '#6B917B',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  adminBadge: {
    fontSize: 11,
    color: '#E8A44F',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e6ede8',
    paddingHorizontal: 10,
  },
  label: {
    width: 100,
    fontSize: 12,
    color: '#6B917B',
    fontFamily: 'Helvetica',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#446950',
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 10,
    color: '#6B917B',
    fontFamily: 'Helvetica',
  },
});

interface TeamPDFDocumentProps {
  players: PlayerInfo[];
  teamName: string;
  onlyIds?: boolean;
}

const TeamPDFDocument = ({
  players,
  teamName,
  onlyIds,
}: TeamPDFDocumentProps) => (
  <Document>
    {onlyIds
      ? players.map((player) => {
          return (
            <Page key={player.id} size="A4" style={styles.page}>
              <View key={player.id} style={styles.playerCard}>
                <View style={styles.row}>
                  <Text style={styles.label}>
                    {player.firstName} {player.lastName}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>
                    NationalID: {player.playerID}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Image
                    src={
                      player.nationalIdImage?.url
                        ? SERVER_URL + player.nationalIdImage?.url
                        : `https://i.ibb.co/RkxjQ1WG/zed4-09.png`
                    }
                    // style={{ width: 250, height: 250 }}
                  />
                </View>
              </View>
            </Page>
          );
        })
      : Array.from({ length: Math.ceil(players.length / 2) }).map(
          (_, pageIndex) => (
            <Page key={pageIndex} size="A4" style={styles.page}>
              {pageIndex === 0 && (
                <View style={styles.section}>
                  <Text style={styles.title}>{teamName} </Text>
                </View>
              )}

              {players.slice(pageIndex * 2, pageIndex * 2 + 2).map((player) => {
                return (
                  <View key={player.id} style={styles.playerCard}>
                    <View style={styles.playerHeader}>
                      <Image
                        src={
                          player.photo?.url
                            ? SERVER_URL + player.photo?.url
                            : `https://i.ibb.co/RkxjQ1WG/zed4-09.png`
                        }
                        style={styles.playerPhoto}
                      />
                      <View>
                        <Text style={styles.playerName}>
                          {player.firstName} {player.lastName}
                        </Text>
                        <Text style={styles.playerPosition}>
                          {player.position}
                          {player.bio?.includes('Administrator') && (
                            <Text style={styles.adminBadge}> • Team Admin</Text>
                          )}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Player ID:</Text>
                      <Text style={styles.value}>{player.playerID}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Phone:</Text>
                      <Text style={styles.value}>{player.phoneNumber}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Email:</Text>
                      <Text style={styles.value}>{player.email}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Kit Name:</Text>
                      <Text style={styles.value}>{player.jerseyName}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Kit Size:</Text>
                      <Text style={styles.value}>{player.kitSize}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Kit Number:</Text>
                      <Text style={styles.value}>{player.jerseyNumber}</Text>
                    </View>
                  </View>
                );
              })}

              <Text style={styles.pageNumber}>
                Page {pageIndex + 1} of {Math.ceil(players.length / 2)}
              </Text>
            </Page>
          )
        )}
  </Document>
);

export default TeamPDFDocument;
