'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Card, CardContent,
  Chip, Box, CircularProgress, Slider, Button
} from '@mui/material';
import { Log } from '../../lib/logger';

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

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchPriority();
  }, [limit]);

  const fetchPriority = async () => {
    setLoading(true);
    try {
      await Log('frontend', 'info', 'page', `Fetching top ${limit} priority notifications`);
      const res = await axios.get(`/api/notifications?limit=${limit}&page=1`);
      if (res.data && Array.isArray(res.data.notifications)) {
        setNotifications(res.data.notifications);
      }
      await Log('frontend', 'info', 'page', 'Priority notifications fetched');
    } catch (err) {
      await Log('frontend', 'error', 'page', 'Failed to fetch priority notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Priority Notifications
        </Typography>
        <Button variant="outlined" href="/">← All Notifications</Button>
      </Box>

      <Box sx={{ mb: 4, px: 2 }}>
        <Typography gutterBottom>Show top <strong>{limit}</strong> notifications</Typography>
        <Slider
          value={limit}
          min={1}
          max={10}
          step={1}
          marks
          onChange={(_, val) => setLimit(val as number)}
          valueLabelDisplay="auto"
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
      ) : notifications.length === 0 ? (
        <Typography>No notifications found.</Typography>
      ) : (
        notifications.map((n, index) => (
          <Card key={n.ID} sx={{ mb: 2, border: '2px solid #f50057' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`#${index + 1}`} size="small" sx={{ bgcolor: '#f50057', color: 'white' }} />
                  <Chip label={n.Type} color={TYPE_COLORS[n.Type] || 'default'} size="small" />
                </Box>
                <Chip label="PRIORITY" color="error" size="small" />
              </Box>
              <Typography mt={1} fontWeight="medium">{n.Message}</Typography>
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
