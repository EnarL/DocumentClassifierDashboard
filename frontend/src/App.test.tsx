import { renderHook, waitFor } from '@testing-library/react';
import { useDocuments } from './hooks/useDocuments';
import {useUpdateClassification} from "./hooks/useUpdateClassification";

describe('useDocuments hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should have correct initial state', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock; // never resolves

    const { result } = renderHook(() => useDocuments());

    expect(result.current.loading).toBe(true);
    expect(result.current.documents).toEqual([]);
    expect(result.current.error).toBeNull();
  });


  it('should fetch and set documents on success', async () => {
    const mockData = [
      { id: 1, title: 'Document 1', classifications: [{ label: 'test', score: 0.9 }] },
    ];

    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
    ) as jest.Mock;

    const { result } = renderHook(() => useDocuments());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.documents).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
  it('should set error on non-ok fetch response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;

    const { result } = renderHook(() => useDocuments());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.documents).toEqual([]);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe('Failed to fetch documents');
  });

});
describe('useUpdateClassification hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call fetch with PATCH and handle success', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
        })
    ) as jest.Mock;

    const { result } = renderHook(() => useUpdateClassification());

    const classifications = [{ label: 'label1', score: 0.8 }];

    await result.current.updateClassification(123, classifications);

    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/classifications/123',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(classifications),
        }
    );
  });

  it('should throw error on non-ok response', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        })
    ) as jest.Mock;

    console.error = jest.fn();

    const { result } = renderHook(() => useUpdateClassification());

    const classifications = [{ label: 'label2', score: 0.5 }];

    await result.current.updateClassification(456, classifications);

    expect(global.fetch).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
        new Error('Failed to update classifications')
    );
  });

  it('should catch and log fetch errors', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    console.error = jest.fn();

    const { result } = renderHook(() => useUpdateClassification());

    const classifications = [{ label: 'label3', score: 0.3 }];

    await result.current.updateClassification(789, classifications);

    expect(global.fetch).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(new Error('Network failure'));
  });
});