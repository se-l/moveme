import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowser,
    FileContextMenu,
    FileData,
    FileHelper,
    FileList,
    FileNavbar,
    FileToolbar,
    setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import React, { useCallback, useMemo, useState } from 'react';

import { showActionNotification } from './util';
import DemoFsMap from './demo.fs_map.json';

//import { FullFileBrowser as F, FileBrowserProps, FileBrowserHandle } from 'chonky';
//const FullFileBrowser = F as React.MemoExoticComponent<React.ForwardRefExoticComponent<FileBrowserProps & React.RefAttributes<FileBrowserHandle>>>;

setChonkyDefaults({ iconComponent: ChonkyIconFA as any });

const rootFolderId = DemoFsMap.rootFolderId;
const fileMap = (DemoFsMap.fileMap as unknown) as {
    [fileId: string]: FileData & { childrenIds: string[] };
};

export const useFiles = (currentFolderId: string): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = currentFolder.childrenIds
            ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
            : [];
        return files;
    }, [currentFolderId]);
};

export const useFolderChain = (currentFolderId: string): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                parentId = null;
            }
        }

        return folderChain;
    }, [currentFolderId]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void
) => {
    return useCallback(
        (data: ChonkyFileActionData) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            }

            showActionNotification(data);
        },
        [setCurrentFolderId]
    );
};


export const ReadOnlyVFSBrowser: React.FC<{ instanceId: string }> = (props) => {
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);

    return (    
        <div style={{ height: 400 }}>
            <FileBrowser
                instanceId={props.instanceId}
                files={files}
                folderChain={folderChain}
                onFileAction={handleFileAction}
                thumbnailGenerator={(file: FileData) =>
                    file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null
                }
                defaultFileViewActionId={ChonkyActions.EnableListView.id}
                disableDragAndDrop={true}
            >
                <FileNavbar />
                {/* <FileToolbar /> */}
                <FileList />
                {/* <FileContextMenu /> */}
            </FileBrowser>
        </div>
    );
};
