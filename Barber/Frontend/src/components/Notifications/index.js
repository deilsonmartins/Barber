import React, { useState, useEffect, useMemo } from 'react';

import { MdNotifications } from 'react-icons/md';

import { parseISO, formatDistance } from 'date-fns';

import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Container,
  Badge,
  NotificationsList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(() =>
    Boolean(
      notifications.find((notification) => notification.leitura === false)
    )
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notificacoes');
      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notificacoes/${id}`);

    setNotifications(
      notifications.map((notification) =>
        notification._id === id
          ? { ...notification, leitura: true }
          : notification
      )
    );
  }
  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#b22222" size={20} />
      </Badge>

      <NotificationsList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification._id} unread={!notification.leitura}>
              <p>{notification.conteudo}</p>
              <time>{notification.timeDistance}</time>
              {!notification.leitura && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationsList>
    </Container>
  );
}
