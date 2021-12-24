import React from 'react';
import {Pane, Heading, Table} from "evergreen-ui";

const Cities: React.FC<{ cities: string[], onSearch(city: string): void }> = ({cities, onSearch}) => {
    return (
        <Pane>
            <Heading size={400}>History</Heading>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>
                        №
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        City name
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
                    {cities.map((city, index) => (
                        <Table.Row key={city + index} isSelectable onSelect={() => onSearch(city)}>
                            <Table.TextCell>{index + 1}</Table.TextCell>
                            <Table.TextCell>{city}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Pane>
    );
};

export default Cities;
