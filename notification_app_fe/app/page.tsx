'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Card, CardContent,
  Chip, Box, CircularProgress, Tabs, Tab , Button
} from '@mui/material';
import { Log } from '../lib/logger';

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const TYPE_COLORS: Record<string, 'success' | 'primary' | 'warning'> = {
  Result: 'success',
  Placement: 'primary',
  Event: 'warning',
};

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      await Log('frontend', 'info', 'api', 'Fetching notifications');
      const res = await axios.get('/api/notifications');
      const data = res.data;
      if (data && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
      }
      await Log('frontend', 'info', 'api', 'Notifications fetched successfully');
    } catch (err) {
      await Log('frontend', 'error', 'api', 'Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markViewed = (id: string) => {
    setViewed(prev => new Set(prev).add(id));
  };

  const types = ['All', 'Result', 'Placement', 'Event'];
  const filtered = notifications.filter(n =>
    tab === 0 ? true : n.Type === types[tab]
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  <Typography variant="h4" fontWeight="bold">
    Campus Notifications
  </Typography>
  <Button variant="contained" color="error" href="/priority">
    Priority View
  </Button>
</Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {types.map(t => <Tab key={t} label={t} />)}
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : filtered.length === 0 ? (
        <Typography>No notifications found.</Typography>
      ) : (
        filtered.map(n => (
          <Card
            key={n.ID}
            sx={{
              mb: 2,
              border: viewed.has(n.ID) ? '1px solid #ccc' : '2px solid #1976d2',
              opacity: viewed.has(n.ID) ? 0.7 : 1,
              cursor: 'pointer'
            }}
            onClick={() => markViewed(n.ID)}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Chip label={n.Type} color={TYPE_COLORS[n.Type] || 'default'} size="small" />
                {!viewed.has(n.ID) && <Chip label="NEW" color="error" size="small" />}
              </Box>
              <Typography mt={1}>{n.Message}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(n.Timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
