import { Routes, Route } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import LeagueDetails from './components/league/LeagueDetails';
import SimpleRegForm from './components/SimpleRegForm';
import PublicTeam from './components/team/PublicTeam';
import MatchDetails from './components/league/MatchDetails';
import Dashboard from './components/dashboard/Dashboard';
import TeamManagement from './components/team/TeamManagement';

function App() {
  return (
    <AppStateProvider>
      <Routes>
        {/* <Route path="/team" element={<TeamManagement />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/team/:teamId" element={<Dashboard />} />
        <Route path="/team/:teamId" element={<PublicTeam />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/league/:sportType" element={<LeagueDetails />} />
        <Route path="/screen" element={<Screen />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/casinoelal3ab" element={<CasinoAl3ab />} />
        <Route
          path="/casinoelal3ab/verify/:userId"
          element={<CasinoAl3abVerify />}
        />
        <Route path="/casinoelal3ab/success" element={<CasinoAl3abSuccess />} />
        <Route path="/casinoelal3ab/verify" element={<CasinoAl3abVerify />} />
        <Route path="/casinoelal3ab/list" element={<CasinoAl3abList />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/team/:teamId" element={<Dashboard />} />
        <Route path="/team" element={<TeamManagement />} />
        <Route path="/team/:teamId" element={<PublicTeam />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/league/:sportType" element={<LeagueDetails />} />

        <Route path="/" element={<SimpleRegForm />} />
        <Route path="/league" element={<LeagueDetails />} />
        <Route path="*" element={<SimpleRegForm />} />
      </Routes>
    </AppStateProvider>
  );
}

export default App;
