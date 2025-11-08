import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Download,
  ArrowLeft,
  LogIn,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { supabase } from '../../lib/supabase';

interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  nationalIdUrl: string;
  is_verified: boolean;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#446950',
  },
  playerCard: {
    marginBottom: 30,
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
  playerName: {
    fontSize: 18,
    color: '#446950',
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
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#446950',
  },
  idImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    objectFit: 'contain',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 10,
    color: '#6B917B',
  },
});

// PDF Document Component
const RegistrationsPDF = ({ users }: { users: RegisteredUser[] }) => (
  <Document>
    {Array.from({ length: Math.ceil(users.length / 2) }).map((_, pageIndex) => (
      <Page key={pageIndex} size="A4" style={styles.page}>
        {pageIndex === 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Casino Al3ab - Registrations</Text>
          </View>
        )}

        {users.slice(pageIndex * 2, pageIndex * 2 + 2).map((user) => (
          <View key={user.id} style={styles.playerCard}>
            <View style={styles.playerHeader}>
              <View>
                <Text style={styles.playerName}>{user.fullName}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{user.phoneNumber}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Registered:</Text>
              <Text style={styles.value}>
                {new Date(user.registrationDate).toLocaleDateString()}
              </Text>
            </View>

            <Image src={user.nationalIdUrl} style={styles.idImage} />
          </View>
        ))}

        <Text style={styles.pageNumber}>
          Page {pageIndex + 1} of {Math.ceil(users.length / 2)}
        </Text>
      </Page>
    ))}
  </Document>
);

const DEMO_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME!,
  password: import.meta.env.VITE_ADMIN_PASSWORD!,
};

export default function CasinoAl3abList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 50;

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Get total count
      const { count: totalRecords, error: countError } = await supabase
        .from('casino_players')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      setTotalCount(totalRecords || 0);

      // Get paginated data
      const { data, error } = await supabase
        .from('casino_players')
        .select('*')
        .order('registration_date', { ascending: false })
        .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

      if (error) throw error;

      setUsers(
        data.map((player) => ({
          id: player.id,
          fullName: player.full_name,
          email: player.email,
          phoneNumber: player.phone_number,
          registrationDate: player.registration_date,
          nationalIdUrl: player.national_id_url,
          is_verified: player.is_verified,
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      loginForm.username === DEMO_CREDENTIALS.username &&
      loginForm.password === DEMO_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('dashboardAuth', 'true');
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const auth = localStorage.getItem('dashboardAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  const handleVerify = async (userId: string) => {
    try {
      setVerifying(userId);
      const { error: updateError } = await supabase
        .from('casino_players')
        .update({
          is_verified: true,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Fetch the updated record to confirm
      const { data: updatedUser, error: fetchError } = await supabase
        .from('casino_players')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      console.log('Updated user:', updatedUser);

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_verified: true,
              }
            : user
        )
      );
    } catch (err) {
      console.error('Error verifying user:', err);
    } finally {
      setVerifying(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone Number', 'Registration Date'];
    const data = users.map((user) => [
      user.fullName,
      user.email,
      user.phoneNumber,
      new Date(user.registrationDate).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...data]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'casino-al3ab-registrations.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-display font-bold text-sage-600 mb-6 text-center">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sage-600 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="w-full p-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full p-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-sage-600" />
            </button>
            <h1 className="text-3xl font-display font-bold text-sage-600">
              Casino Al3ab Registrations
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Search and Export */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-colors whitespace-nowrap"
                title="Export as CSV"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
              <PDFDownloadLink
                document={<RegistrationsPDF users={filteredUsers} />}
                fileName={`casino-al3ab-registrations-from-${
                  currentPage * PAGE_SIZE + 1
                }-to-${Math.min(
                  (currentPage + 1) * PAGE_SIZE,
                  totalCount
                )}.pdf`}
                className="flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-500 transition-colors whitespace-nowrap"
                disabled={loading}
              >
                {({ loading }) => (
                  <>
                    <FileText className="w-5 h-5" />
                    {loading ? 'Generating PDF...' : 'Export PDF'}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
        <div className="mb-2 text-lg">
          Count: <b className="text-peach-400">{totalCount}</b>
        </div>

        {totalCount > 0 && (
          <div className="my-3 flex items-center justify-between bg-white px-4 py-3 rounded-2xl shadow-lg">
            <div className="md:hidden flex flex-1 justify-between items-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-sage-700 hover:bg-sage-50 disabled:opacity-50"
              >
                Previous
              </button>
              <div className="text-sage-700 flex flex-row items-center">
                {currentPage * PAGE_SIZE + 1} -{' '}
                {Math.min((currentPage + 1) * PAGE_SIZE, totalCount)} of{' '}
                {totalCount}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={currentPage === totalPages - 1}
                className="relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-sage-700 hover:bg-sage-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-sage-700">
                  Showing{' '}
                  <span className="font-medium">
                    {currentPage * PAGE_SIZE + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min((currentPage + 1) * PAGE_SIZE, totalCount)}
                  </span>{' '}
                  of <span className="font-medium">{totalCount}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-sage-600 hover:bg-sage-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === idx
                          ? 'z-10 bg-peach-400 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach-400'
                          : 'text-sage-900 hover:bg-sage-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={currentPage === totalPages - 1}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-sage-600 hover:bg-sage-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        {/* Users List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-600 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-sage-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-sage-600 mb-2">
                No registrations found
              </h3>
              <p className="text-sage-500">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sage-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Registration Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-sage-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-sage-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-sage-400" />
                          <span className="font-medium text-sage-600">
                            {user.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-sage-400" />
                          <span className="text-sage-600">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-sage-400" />
                          <span className="text-sage-600">
                            {user.phoneNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-sage-400" />
                          <span className="text-sage-600">
                            {new Date(
                              user.registrationDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.is_verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                              <XCircle className="w-4 h-4" />
                              Pending
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {!user.is_verified && (
                          <button
                            onClick={() => handleVerify(user.id)}
                            disabled={verifying === user.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors disabled:opacity-50"
                          >
                            {verifying === user.id ? 'Verifying...' : 'Verify'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
