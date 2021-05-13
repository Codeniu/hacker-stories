import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledButtonSmall } from '@/screens/project-list/list';

const Minio = require('minio');
export const MinioScreen = () => {
    const minioClient = new Minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    });

    const [buckets, setBuckets] = useState([]);
    const [bucketName, setBucketName] = useState(
        '00ee2aff-df85-40a7-8403-97002eef7ff2'
    );
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        console.log('123');
        minioClient.listBuckets(function (err, buckets) {
            if (err) return console.log(err);
            setBuckets(buckets);
        });

        showDetial({ name: bucketName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showDetial = item => {
        const bucketName = item.name;
        setBucketName(bucketName);
        const stream = minioClient.listObjectsV2(bucketName, '', true);
        let newObject = [];
        stream.on('data', obj => {
            newObject.push(obj);
        });
        stream.on('error', err => {
            console.log(err);
        });
        setTimeout(() => {
            console.log(newObject);
            setObjects(newObject);
        }, 700);
    };
    return (
        <>
            <h1>Minio</h1>
            <Title>
                <StyledColumn width="40%">name</StyledColumn>
                <StyledColumn width="30%">creationDate</StyledColumn>
                <StyledColumn width="30%">operation</StyledColumn>
            </Title>
            {buckets.splice(0, 10).map(item => (
                <Item key={item.name} item={item} onHandleItem={showDetial} />
            ))}

            <h1>bucketName:{bucketName}</h1>

            <Title>
                <StyledColumn width="20%">etag</StyledColumn>
                <StyledColumn width="20%">name</StyledColumn>
                <StyledColumn width="20%">size</StyledColumn>
                <StyledColumn width="20%">toLocaleString</StyledColumn>
                <StyledColumn width="20%">action</StyledColumn>
            </Title>
            {objects.map(item => (
                <ObjectItem key={item.etag} item={item} />
            ))}
        </>
    );
};

const ObjectItem = ({ item, onHandleItem }) => {
    return (
        <ItemLine>
            <StyledColumn width="20%">{item.etag}</StyledColumn>
            <StyledColumn width="20%">{item.name}</StyledColumn>
            <StyledColumn width="20%">
                {Math.floor(item.size / 1024)}
            </StyledColumn>
            <StyledColumn width="20%">
                {item.lastModified.toLocaleString()}
            </StyledColumn>
            <StyledColumn width="20%">
                <StyledButtonSmall
                    type="button"
                    onClick={() => onHandleItem(item)}
                >
                    Detial
                </StyledButtonSmall>
            </StyledColumn>
        </ItemLine>
    );
};

const Item = ({ item, onHandleItem }) => {
    return (
        <ItemLine>
            <StyledColumn width="40%">{item.name}</StyledColumn>
            <StyledColumn width="30%">
                {item.creationDate.toLocaleString()}
            </StyledColumn>
            <StyledColumn width="30%">
                <StyledButtonSmall
                    type="button"
                    onClick={() => onHandleItem(item)}
                >
                    Detial
                </StyledButtonSmall>
            </StyledColumn>
        </ItemLine>
    );
};

const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    a {
        color: inherit;
    }

    width: ${props => props.width};
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Title = styled(FlexWrapper)`
    font-size: 2.4rem;
    font-weight: bold;
`;
const ItemLine = styled(FlexWrapper)`
    font-size: 1.8rem;
`;
