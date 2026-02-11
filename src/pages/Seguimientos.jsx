import React, { useState, useMemo, useEffect } from 'react';
import deliveriesData from '../data/deliveries.json';
import { parseDateDMY } from '../utils/date.js';
import { DeliveryStatsCards } from '../components/seguimiento/DeliveryStatsCards.jsx';
import { DeliveryFilters } from '../components/seguimiento/DeliveryFilters.jsx';
import { DeliveriesTable } from '../components/seguimiento/DeliveriesTable.jsx';
import { DeliveryDetailModal } from '../components/seguimiento/DeliveryDetailModal.jsx';
import { getMyEntregas } from '../api/funcionario.api';

export default function Seguimientos() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [filterPeriod, setFilterPeriod] = useState('30-days');

    useEffect(() => {
        loadDeliveries();
    }, []);

    async function loadDeliveries() {
        try {
            setLoading(true);
            const data = await getMyEntregas();
            setDeliveries(data);
        } catch (error) {
            console.error('Error loading deliveries, using static data:', error);
            setDeliveries(deliveriesData);
        } finally {
            setLoading(false);
        }
    }

    const handleViewDetail = (delivery) => {
        setSelectedDelivery(delivery);
        setModalOpen(true);
    };

    const filteredDeliveries = useMemo(() => {
        const now = new Date();
        let days = null;
        if (filterPeriod === '30-days') days = 30;
        else if (filterPeriod === '3-months') days = 90;

        return deliveries.filter((d) => {
            if (filterStatus !== 'all' && d.status !== filterStatus) return false;
            if (filterType !== 'all' && d.type !== filterType) return false;

            if (days !== null) {
                const dt = parseDateDMY(d.dispatchDate);
                if (!dt) return false;
                const diff = (now - dt) / (1000 * 60 * 60 * 24);
                if (diff > days) return false;
            }

            return true;
        });
    }, [deliveries, filterStatus, filterType, filterPeriod]);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="ml-64 min-[1400px]:w-[90%] min-[1400px]:mx-auto">
                <div className="">
                    <div className="mb-8">
                        <h2 className="text-gray-900 mb-2">Seguimiento de despachos</h2>
                        <p className="text-gray-600">Consulta el estado y avance de entrega de tus uniformes</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                            <p className="ml-3 text-gray-600">Cargando despachos...</p>
                        </div>
                    ) : (
                        <>
                            <DeliveryStatsCards deliveries={deliveries} />

                            <DeliveryFilters
                                status={filterStatus}
                                type={filterType}
                                period={filterPeriod}
                                onChangeStatus={setFilterStatus}
                                onChangeType={setFilterType}
                                onChangePeriod={setFilterPeriod}
                            />

                            <DeliveriesTable
                                deliveries={filteredDeliveries}
                                onViewDetail={handleViewDetail}
                            />
                        </>
                    )}
                </div>
            </main>

            <DeliveryDetailModal
                delivery={selectedDelivery}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
