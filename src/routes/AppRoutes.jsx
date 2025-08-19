import { Routes, Route } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import { routeConfig } from './config';

function generateRoutes(config, prefix = '') {
    return config.flatMap(({ path, element, children }) => {
        const fullPath = prefix
            ? `${prefix}/${path}`.replace(/^\/+/, '')
            : path;

        const baseRoute = (
            <Route
                key={fullPath || 'root'}
                path={fullPath}
                element={element}
            />
        );

        const idRoute = (
            <Route
                key={`${fullPath || 'root'}-id`}
                path={`${fullPath ? `${fullPath}/` : ''}:otherUserId`}
                element={element}
            />
        );

        const childRoutes = children
            ? generateRoutes(children, fullPath)
            : [];

        return [baseRoute, idRoute, ...childRoutes];
    });
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {generateRoutes(routeConfig.main)}
            </Route>

            {routeConfig.extra.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
}
