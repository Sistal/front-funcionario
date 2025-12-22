import { Card, CardContent } from '../ui/Card.jsx';

export function StatCard({ title, value, description, variant = 'default' }) {
    return (
        <Card className={variant === 'highlight' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}>
            <CardContent className="p-6 flex flex-col gap-2">
                <h5 className="text-sm text-gray-600 mb-2">{title}</h5>
                <p className={`text-3xl font-bold mb-1 ${variant === 'highlight' ? 'text-blue-600' : 'text-gray-900'}`}>
                    {value}
                </p>
                <p className="text-sm text-gray-500">{description}</p>
            </CardContent>
        </Card>
    );
}

