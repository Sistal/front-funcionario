import React, { useState } from 'react';
import { Bell, Clock, Package, AlertCircle, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover.jsx';
import { Button } from '../ui/Button.jsx';
import { ScrollArea } from '../ui/ScrollArea.jsx';
import { Separator } from '../ui/Separator.jsx';
import { useNavigate } from 'react-router-dom';

const mockNotifications = [
	{
		id: '1',
		type: 'success',
		title: 'Solicitud aprobada',
		description:
			'Tu solicitud #2024-0847 ha sido aprobada y está en proceso de preparación.',
		time: 'Hace 5 minutos',
		read: false,
	},
	{
		id: '2',
		type: 'info',
		title: 'Entrega programada',
		description: 'Tu pedido será entregado el 20 de diciembre en la Sucursal Centro.',
		time: 'Hace 1 hora',
		read: false,
	},
	{
		id: '3',
		type: 'warning',
		title: 'Documentación pendiente',
		description:
			'Debes completar la documentación para tu solicitud de cambio de talla.',
		time: 'Hace 3 horas',
		read: false,
	},
	{
		id: '4',
		type: 'success',
		title: 'Entrega confirmada',
		description:
			'Has recibido correctamente tu pedido #2024-0832. Gracias por confirmar.',
		time: 'Hace 1 día',
		read: true,
	},
	{
		id: '5',
		type: 'info',
		title: 'Nueva temporada disponible',
		description: 'Ya puedes solicitar uniformes de la temporada Verano 2025.',
		time: 'Hace 2 días',
		read: true,
	},
	{
		id: '6',
		type: 'error',
		title: 'Solicitud rechazada',
		description:
			'Tu solicitud #2024-0820 fue rechazada. Revisa los comentarios del supervisor.',
		time: 'Hace 3 días',
		read: true,
	},
];

export function NotificationsPopover() {
	const [notifications, setNotifications] = useState(mockNotifications);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const getIcon = (type) => {
		switch (type) {
			case 'success':
				return <CheckCircle className="w-5 h-5 text-green-600" />;
			case 'warning':
				return <AlertCircle className="w-5 h-5 text-amber-600" />;
			case 'info':
				return <Package className="w-5 h-5 text-blue-600" />;
			case 'error':
				return <XCircle className="w-5 h-5 text-red-600" />;
			default:
				return <Bell className="w-5 h-5 text-gray-600" />;
		}
	};

	const getIconBgColor = (type) => {
		switch (type) {
			case 'success':
				return 'bg-green-50';
			case 'warning':
				return 'bg-amber-50';
			case 'info':
				return 'bg-blue-50';
			case 'error':
				return 'bg-red-50';
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
									className="!text-xs text-blue-600 hover:text-blue-700 h-auto py-1"
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
												!notification.read ? 'bg-blue-50/30' : ''
											}`}
											onClick={() => markAsRead(notification.id)}
										>
											<div className="flex gap-3">
												<div
													className={`w-10 h-10 rounded-lg ${getIconBgColor(
														notification.type
													)} flex items-center justify-center flex-shrink-0`}
												>
													{getIcon(notification.type)}
												</div>

												<div className="flex-1 min-w-0">
													<div className="flex items-start justify-between gap-2 mb-1">
														<h5
															className={'text-sm font-medium text-gray-900'}>
															{notification.title}
														</h5>
														{!notification.read && (
															<div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
														)}
													</div>
													<p className="text-xs text-gray-600 mb-2 leading-relaxed">
														{notification.description}
													</p>
													<div className="flex items-center gap-1.5 text-xs text-gray-500">
														<Clock className="w-3 h-3" />{' '}
														<span>{notification.time}</span>
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
									className="w-full justify-between !text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
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
