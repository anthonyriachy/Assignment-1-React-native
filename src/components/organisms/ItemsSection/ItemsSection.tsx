import React from 'react';
import { ItemsSectionProps } from './ItemsSection.type';
import { VerticalList } from '../VeritcalList';
import { HorizontalList } from '../HorizontalList';



export function ItemsSection({title, horizontal = false, onClick, data, onLoadMore, isLoading, hasMore, isFetchingMore}: ItemsSectionProps) {


	if (horizontal) {
		return <HorizontalList title={title} onClick={onClick} data={data} isLoading={isLoading} />;
	}


	return <VerticalList
		title={title}
		onClick={onClick}
		data={data}
		onLoadMore={onLoadMore}
		isLoading={isLoading}
		hasMore={hasMore}
		isFetchingMore={isFetchingMore}
	/>;
}

