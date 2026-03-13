import React, { useEffect, useState } from 'react';
import { Bell, Clock, Package, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover.jsx';
import { Button } from '../ui/Button.jsx';
import { ScrollArea } from '../ui/ScrollArea.jsx';
import { Separator } from '../ui/Separator.jsx';
import { useNavigate } from 'react-router-dom';
import { notificationsApi } from '../../api/notifications.api.js';
import { formatDateTime } from '../../utils/date.js';

export function NotificationsPopover() {
	const [notifications, setNotifications] = useState([]);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (open) {
			loadNotifications();
		}
	}, [open]);

	async function loadNotifications() {
		try {
			const data = await notificationsApi.getAll();
			setNotifications(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error loading notifications:', error);
		}
	}

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const markAsRead = (id) => {
		notificationsApi.markAsRead(id).catch((error) => console.error(error));
		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
	};

	const markAllAsRead = () => {
		notificationsApi.markAllAsRead().catch((error) => console.error(error));
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	};

	const getIcon = (type) => {
		switch (type) {
			case 'approved':
				return <CheckCircle className="w-5 h-5 text-green-600" />;
			case 'alert':
				return <AlertCircle className="w-5 h-5 text-amber-600" />;
			case 'update':
				return <Package className="w-5 h-5 text-blue-600" />;
			case 'delivery':
				return <Package className="w-5 h-5 text-purple-600" />;
			default:
				return <Bell className="w-5 h-5 text-gray-600" />;
		}
	};

	const getIconBgColor = (type) => {
		switch (type) {
			case 'approved':
				return 'bg-green-50';
			case 'alert':
				return 'bg-amber-50';
			case 'update':
				return 'bg-blue-50';
			case 'delivery':
				return 'bg-purple-50';
			default:
				return 'bg-gray-50';
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<button className="cursor-pointer relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
					<Bell className="w-5 h-5 text-gray-600" />
					{unreadCount > 0 && (
						<span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs rounded-full">
							{unreadCount > 9 ? '9+' : unreadCount}
						</span>
					)}
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-[380px] p-0 mr-4" align="end" sideOffset={8}>
				<div className="flex flex-col">
					<div className="px-4 py-3 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<h4 className="text-gray-900">Notificaciones</h4>
								{unreadCount > 0 && (
									<p className="text-xs text-gray-500 mt-0.5">
										Tienes {unreadCount}{' '}
										{unreadCount === 1
											? 'notificación nueva'
											: 'notificaciones nuevas'}
									</p>
								)}
							</div>

							{unreadCount > 0 && (
								<Button
									variant="ghost"
									size="sm"
									className="text-xs text-blue-600 hover:text-blue-700 h-auto py-1"
									onClick={markAllAsRead}
								>
									Marcar todas como leídas
								</Button>
							)}
						</div>
					</div>

					<ScrollArea className="h-[400px]">
						<div className="py-2">
							{notifications.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-12 px-4">
									<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
										<Bell className="w-8 h-8 text-gray-400" />
									</div>
									<p className="text-gray-900 font-medium mb-1">
										No tienes notificaciones
									</p>
									<p className="text-sm text-gray-500 text-center">
										Te avisaremos cuando haya actualizaciones importantes
									</p>
								</div>
							) : (
								notifications.map((notification, index) => (
									<div key={notification.id}>
										<div
											className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
												!notification.isRead ? 'bg-blue-50/30' : ''
											}`}
											onClick={() => markAsRead(notification.id)}
										>
											<div className="flex gap-3">
												<div
													className={`w-10 h-10 rounded-lg ${getIconBgColor(
														notification.type
													)} flex items-center justify-center shrink-0`}
												>
													{getIcon(notification.type)}
												</div>

												<div className="flex-1 min-w-0">
													<div className="flex items-start justify-between gap-2 mb-1">
														<h5
															className={'text-sm font-medium text-gray-900'}>
															{notification.title}
														</h5>
														{!notification.isRead && (
															<div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5" />
														)}
													</div>
													<p className="text-xs text-gray-600 mb-2 leading-relaxed">
														{notification.message}
													</p>
													<div className="flex items-center gap-1.5 text-xs text-gray-500">
														<Clock className="w-3 h-3" />{' '}
														<span>{formatDateTime(notification.timestamp)}</span>
													</div>
												</div>
											</div>
										</div>

										{index < notifications.length - 1 && <Separator />}
									</div>
								))
							)}
						</div>
					</ScrollArea>

					{notifications.length > 0 && (
						<>
							<Separator />
							<div className="px-4 py-3">
								<Button
									variant="ghost"
									className="w-full justify-between text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
									onClick={() => {
										setOpen(false);
										navigate('/notificaciones');
									}}
								>
									Ver todas las notificaciones
									<ChevronRight className="w-4 h-4" />
								</Button>
							</div>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
